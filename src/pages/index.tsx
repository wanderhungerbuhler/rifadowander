import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Container, Btn, CardInfo, BoxWhatsApp } from '@styles/home';

import logoSvg from '@assets/logo.svg';
import imgDualSense from '@assets/img-dualsense.svg';
import thumbPs5 from "@assets/thumbs-wander-ps5.png";
import iconPs5 from "@assets/icon-ps5.svg";
import iconWhatsApp from "@assets/icon-whatsapp.svg";

import CheckoutPix from './CheckoutPix';
import Head from 'next/head';
import { api } from '@src/services/api';

interface loadDataProps {
  id: string;
  tickets: string;
  status_payment: string;
}

export default function Home() {
  const pageTitle = "RIFA DO WANDER 🎮";
  const description = "Participe da RIFA DO WANDER 🎮. O objetivo desta rifa é entregar um playstation 5 novo ao ganhador."
  const pageImage = "";

  const [selectedItems, setSelectedItems] = useState([]);
  const [loadData, setLoadData] = useState<loadDataProps[] | null>([]);

  function handleNumbersSelected(id: any) {
    if (selectedItems?.includes(id as never)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== id));
    } else {
      setSelectedItems([...selectedItems, id] as any);
    }
  }

  useEffect(() => {
    async function RefreshData() {
      const response = await api[1].get('/tickets');
      setLoadData(response?.data as any);
    }

    RefreshData();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>RIFA DO WANDER 🎮</title>
        <meta name="description" content="Participe da RIFA DO WANDER 🎮.
        O objetivo desta rifa é entregar um playstation 5 novo ao ganhador." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="rifa do wander, playstation, rifa, wander, play,
          rifa do playstation 5, videogame, sorteio, prêmio, resultado." />
        <meta name="author" content="Wander Hungerbühler" />

        <meta name="MobileOptimized" content="320" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="theme-color" content="#2F2C53" />
        <meta name="msapplication-TileColor" content="#2F2C53" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="google" content="notranslate" />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={pageTitle} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:secure_url" content={pageImage} />
        <meta property="og:image:alt" content="Thumbnail" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <Container>
        <Image
          src={logoSvg}
          alt="Logo - RIFA DO WANDER"
        />

        <CardInfo bg={true}>
          <div>
            <h1>São 200 números para você escolher!</h1>
            <p>*O valor de cada número é de R$50 reais para participar da <b>RIFA DO WANDER.</b></p>
          </div>

          <Image
            src={imgDualSense}
            alt="Img - Dualsense"
          />
        </CardInfo>

        <CardInfo bg={false}>
          <div>
            <Image
              src={iconPs5}
              alt="Img - Icon Ps5"
            />

            <h2>NOVINHO & NA SUA CASA</h2>
          </div>

          <Image
            src={thumbPs5}
            alt="Img - Wander e Ps5"
          />
        </CardInfo>

        <BoxWhatsApp>
          <a
            href="https://wa.me/+351927509754?text=Ol%C3%A1,%20eu%20tenho%20d%C3%BAvidas%20sobre%20o%20valor%20e%20quando%20ser%C3%A1%20o%20sorteio."
            target="_blank"
          >
            <Image
              width={70}
              src={iconWhatsApp}
              alt="Tire suas dúvidas através do nosso WhatsApp."
            />
          </a>
        </BoxWhatsApp>

        <div className="choosenumbers">
          {loadData?.map((number) => (
            <Btn
              key={number?.id}
              style={{
                border: number?.status_payment === "pending" || "approved" ? "" : selectedItems?.includes(number?.id as never) ? "2px solid #723EB5" : "",
                background: number?.status_payment === "pending" || "approved" ? "#1E1E1E" : "",
                color: number?.status_payment === "pending" ? "#323232" : "",
                textDecoration: number?.status_payment === "pending" || "approved" ? "line-through" : ""
              }}
              onClick={() => number?.status_payment === "pending" || "approved" ? "" : handleNumbersSelected(number?.id as any)}
            >
              {number?.id}
            </Btn>
          ))}
        </div>

        <CheckoutPix
          tickets={selectedItems as any}
        />
      </Container >

    </>
  )
}
