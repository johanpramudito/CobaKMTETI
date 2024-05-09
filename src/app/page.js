"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const checkVal = async (e) => {
    e.preventDefault();
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    try {
      const response = await axios.post(
        "https://0lkw8msj-3000.asse.devtunnels.ms/",
        {
          title: judul,
          content: isi,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Loop through all document value
    for (let i = 0; i < document.forms[0].length; i++) {
      document.forms[0].elements[i].value = "";
    }
  };

  const [content, setContent] = useState([]);
  const getContent = async () => {
    try {
      const response = await axios.get(
        "https://0lkw8msj-3000.asse.devtunnels.ms/"
      );
      setContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  const getResponse = (res) => {
    window.parent.postMessage("Route("+res+")", "*");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, World!</h1>
      <img
        src="https://source.unsplash.com/random?computer"
        alt="Next.js Logo"
        width="1000"
        height="1000"
      />
      <div className="flex flex-col">
        {content.map((item, index) => {
          return (
            <a
              onClick={() => {
                getResponse(item._id);
              }}
              key={index}
              className="text-2xl font-bold cursor-pointer"
              // href={"/" + item._id}
              id={item._id}
            >
              {item.title}
            </a>
          );
        })}
      </div>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          checkVal(e);
        }}
      >
        <label id="coba" for="judul">
          Judul
        </label>
        <input type="text" id="judul" name="judul" className="text-black" />
        <label for="isi">Isi</label>
        <textarea id="isi" name="isi" className="text-black"></textarea>
        <button type="submit" className="mt-[1vw]">
          Submit
        </button>
      </form>
      <iframe src="https://chat.openai.com" title="ChatGPT"></iframe>
    </main>
  );
}
