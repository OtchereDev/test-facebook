import Image from "next/image";
import { Inter } from "next/font/google";
import {
  BasisTheoryProvider,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  useBasisTheory,
} from "@basis-theory/basis-theory-react";
import { useEffect, useRef, useState } from "react";
import { BasisTheory } from "@basis-theory/basis-theory-js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { bt } = useBasisTheory("key_GqENf1aNp2SuwkpiibzaMr", {
    elements: true,
  });

  let newbt: any;

  async function initTheory() {
    const newbt = await new BasisTheory().init("key_GqENf1aNp2SuwkpiibzaMr");

    const token = await newbt.tokens.create({
      type: "card",
      data: {
        number: "374245455400126",
        expiration_month: "05",
        expiration_year: "2026",
        cvc: 5999,
      },
    });

    console.log(token);
  }

  async function pay() {
    if (!newbt) await initTheory();
  }

  const [cardName, setCarName] = useState("");
  const [cardLastName, setCardLastName] = useState("");
  const cardNumberRef = useRef<any>(null);
  const cardExpirationRef = useRef<any>(null);
  const cardVerificationRef = useRef<any>(null);
  const [cardBrand, setCardBrand] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setIsLoading(true);
    try {
      const token = await bt?.tokens.create({
        type: "card",
        data: {
          number: cardNumberRef.current,
          expiration_month: cardExpirationRef.current.month(),
          expiration_year: cardExpirationRef.current.year(),
          cvc: cardVerificationRef.current,
          firstname: cardName,
          lastname: cardLastName,
        },
        mask: {
          number: "{{ data.number | reveal_last: 4 }}",
          expiration_month: "{{ data.expiration_month }}",
          expiration_year: "{{ data.expiration_year }}",
          firstname: "{{ data.firstname }}",
          lastname: "{{ data.lastname }}",
        },
      });
      console.log("token:", token);
      // store token.id in your database
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <BasisTheoryProvider bt={bt}>
      <div className=" w-72">
        <input
          className="bg-transparent border-b outline-none"
          type="text"
          value={cardName}
          onChange={(e) => setCarName(e.target.value)}
        />

        <input
          className="bg-transparent border-b outline-none"
          type="text"
          value={cardLastName}
          onChange={(e) => setCardLastName(e.target.value)}
        />

        <CardNumberElement
          id="myCardNumber"
          ref={cardNumberRef}
          onChange={({ cardBrand }) => setCardBrand(cardBrand)}
        />
        <div>
          <div>
            <CardExpirationDateElement
              id="myCardExpiration"
              ref={cardExpirationRef}
            />
          </div>
          <div>
            <CardVerificationCodeElement
              id="myCardVerification"
              ref={cardVerificationRef}
              cardBrand={cardBrand}
            />
          </div>
        </div>
        <button
          className="mt-4 bg-white py-2 rounded-md px-4"
          onClick={initTheory}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </BasisTheoryProvider>
  );
}
