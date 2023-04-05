import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Image from 'next/image';

import gifPaymentApproved from '@assets/payment-approved.png';

import { api } from '@services/api';

import { Container, Form, BoxVerifyPayment, InputError, InfoPayment } from '@styles/pages/CheckoutPix/styles';

interface CheckoutPixProps {
  tickets: [];
}

interface ResponsePaymentProps {
  data: {
    id: number;
  };
}

const FormSchema = z.object({
  name: z.string()
    .min(3, { message: 'Precisa ao menos ter 3 letras' }),
  cpf: z.string().min(1, { message: 'Você precisa colocar os 11 dígitos do CPF válido' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  whatsapp: z.string().min(1, { message: 'Digite um WhatsApp válido' })
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CheckoutPix({ tickets }: CheckoutPixProps) {
  const [responsePayment, setResponsePayment] = useState<ResponsePaymentProps | null>(null);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState("");
  const [statusPayment, setStatusPayment] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  });

  // MULTIPLIED PER UNIT
  const ticketFinal = Number(tickets?.length) * 50;


  const getStatusPayment = useCallback(async () => {
    await api[0].get(`v1/payments/${responsePayment?.data?.id}`)
      .then(async (response) => {
        if (response.data.status === "pending") {
          setStatusPayment(true);
        }
      });
  }, [statusPayment, responsePayment]);


  async function handleSendPay({ name, cpf, email, whatsapp }: FormSchemaType) {
    try {
      if (tickets?.length <= 0) {
        return alert("Escolha ao menos 1(um) número para participar da rifa.");
      }

      // CREATE USER AND TICKETS
      await api[1].post("/users", {
        name,
        cpf,
        email,
        whatsapp,
        tickets,
        status_payment: statusPayment === true ? "approved" : "pending"
      });

      const user = {
        name,
        cpf,
        email,
        whatsapp
      }

      const userLocalStorage = JSON.stringify(user);

      localStorage.setItem('@rifadowander', userLocalStorage);

      const dataRequest = {
        "transaction_amount": ticketFinal,
        "description": "Rifa do Wander",
        "payment_method_id": "pix",
        "payer": {
          "first_name": name,
          "email": email,
          "identification": {
            "type": "CPF",
            "number": cpf
          }
        },
        "notification_url": "https://eorpjcvcjvhqnq6.m.pipedream.net"
      }

      // CREATE REQUEST TO PAYMENT
      await api[0].post("v1/payments", dataRequest)
        .then(response => {
          setResponsePayment(response as any)
          setLinkBuyMercadoPago(response?.data?.point_of_interaction?.transaction_data?.ticket_url)
        }).catch(async (err) => {
          if (err?.response?.data?.message) {
            return alert('Por favor: Digite um CPF válido');
          }
        });

    } catch (error) {
      console.log(`Error try`, error)
    }
  }

  return (
    <Container>

      {!responsePayment && (
        <Form onSubmit={handleSubmit(handleSendPay)}>
          <h2>
            CONFIRME SUAS ESCOLHAS E EFETUE O PAGAMENTO ABAIXO
          </h2>
          <p>É importante que você faça o preenchimento dos campos abaixo
            corretamente, para que ao final do evento, possamos localizar
            e premiá-lo(a).
          </p>

          <input placeholder="Nome completo" {...register("name")} />
          <InputError>{errors.name?.message}</InputError>

          <input placeholder="CPF" {...register("cpf")} />
          <InputError>{errors.cpf?.message}</InputError>

          <input placeholder="E-mail" {...register("email")} />
          <InputError>{errors.email?.message}</InputError>

          <input placeholder="WhatsApp" {...register("whatsapp")} />
          <InputError>{errors.whatsapp?.message}</InputError>

          <button type="submit">
            Efetuar pagamento
          </button>
        </Form>
      )}

      <BoxVerifyPayment>
        {linkBuyMercadoPago && !statusPayment && (
          <iframe src={linkBuyMercadoPago} width="620px" height="500px" title="link_buy" />
        )}

        {statusPayment && (
          <InfoPayment>
            <Image
              width={100}
              src={gifPaymentApproved}
              alt="Payment Approved"
            />
            <h3>Compra Aprovada!</h3>
            <p>pedimos que envie o comprovante para o WhatsApp abaixo:</p>
            <a href={`https://wa.me/+351927509754?text=Ol%C3%A1,%20eu%20estou%20interessado(a)%20em%20participar%20desta%20rifa%20e%20por%20isso,%20escolhi%20os%20n%C3%BAmeros%20[${tickets}]`}>Enviar comprovante</a>
          </InfoPayment>
        )}

        {responsePayment &&
          <button onClick={getStatusPayment}>Já fiz o pagamento!</button>
        }
      </BoxVerifyPayment>


    </Container>
  );
}
