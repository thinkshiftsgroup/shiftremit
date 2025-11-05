"use client";

import { useState, useEffect } from 'react';

const PaymentSwiper = () => {
    const names = [
        "Maureen", "James", "Sarah", "Michael", "Emma", "David", "Olivia", "Robert", "Ava", "William",
        "Isabella", "Richard", "Sophia", "Joseph", "Charlotte", "Thomas", "Amelia", "Charles", "Mia", "Christopher",
        "Harper", "Daniel", "Evelyn", "Matthew", "Abigail", "Anthony", "Emily", "Mark", "Elizabeth", "Donald",
        "Ella", "Steven", "Avery", "Paul", "Scarlett", "Andrew", "Victoria", "Joshua", "Abigail", "Kenneth",
        "Kevin", "Grace", "Brian", "Camila", "Edward", "Ella", "Ronald", "Timothy", "Jason", "Lily",
        "Jeffrey", "Lucy", "Ryan", "Nora", "Jacob", "Eleanor", "Gary", "Aria", "Nicholas", "Addison",
        "Eric", "Natalie", "Jonathan", "Zoey", "Stephen", "Brooklyn", "Larry", "Lillian", "Justin", "Audrey",
        "Scott", "Violet", "Brandon", "Stella", "Benjamin", "Hazel", "Samuel", "Skylar", "Frank", "Alexa",
        "Gregory", "Bella", "Alexander", "Aurora", "Raymond", "Patrick", "Jack", "Dennis", "Jerry", "Tyler",
        "Aaron", "Jose", "Adam", "Catherine", "Gianna", "Natalia", "Sienna", "Valentina", "Diana", "Hannah"
    ];

    const amounts = [
        100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3500,
        4000, 4500, 5000, 6000, 7000, 7500, 8000, 9000, 10000, 12000, 15000, 18000,
        20000, 25000, 30000, 40000, 50000, 75000, 100000
    ];
    const tags = [
        '#rent', '#fee', '#investment', '#loan', '#salary', '#bonus', '#gift', '#bill', '#refund', '#deposit',
        '#savings', '#groceries', '#utilities', '#fuel', '#transport', '#internet', '#health', '#insurance',
        '#tax', '#subscription', '#equipment', '#maintenance', '#education', '#clothing', '#charity',
        '#entertainment', '#vacation', '#repair', '#electronics', '#food', '#emergency', '#interest',
        '#commission', '#allowance', '#business', '#credit', '#withdrawal', '#dividend', '#mortgage', '#service'
    ];
    const currencies = ['£'];

    const [currentPayment, setCurrentPayment] = useState<{ name: string; amount: number; tag: string; currency: string } | null>(null);
    const [isShuffling, setIsShuffling] = useState(false);

    const generateRandomPayment = () => {
        return {
            name: names[Math.floor(Math.random() * names.length)],
            amount: amounts[Math.floor(Math.random() * amounts.length)],
            tag: tags[Math.floor(Math.random() * tags.length)],
            currency: currencies[Math.floor(Math.random() * currencies.length)]
        };
    };

    useEffect(() => {
        setCurrentPayment(generateRandomPayment());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShuffling(true);
            setTimeout(() => {
                setCurrentPayment(generateRandomPayment());
                setIsShuffling(false);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center">
            {currentPayment && (
                <div
                    className={`flex gap-2 transition-all duration-300 ${isShuffling ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                >
                    <img src="/images/shiftremit-logo.png" className="h-[25px] md:h-[35px]" alt="" />
                    <p className="text-white flex items-center text-[16px] md:text-2xl gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 36 36">
                            <path fill="#00247d" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z" strokeWidth={0.2} stroke="#00247d"></path>
                            <path fill="#cf1b2b" d="m25.14 23l9.712 6.801a4 4 0 0 0 .99-1.749L28.627 23zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943zm10-10h2.141l9.711-6.8a4 4 0 0 0-1.937-1.085L23 12.057zm-12.141 0L1.148 6.2a4 4 0 0 0-.991 1.749L7.372 13z" strokeWidth={0.2} stroke="#cf1b2b"></path>
                            <path fill="#eee" d="M36 21H21v10h2v-5.836L31.335 31H32a4 4 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21zM36 9a3.98 3.98 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4 4 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059zM13 5v5.837L4.664 5H4a4 4 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A4 4 0 0 0 0 9v.059L5.628 13H0v2h15V5z" strokeWidth={0.2} stroke="#eee"></path>
                            <path fill="#cf1b2b" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" strokeWidth={0.2} stroke="#cf1b2b"></path>
                        </svg>
                        {currentPayment.name} just sent <span className="font-medium">{currentPayment.currency}{currentPayment.amount}</span> {currentPayment.tag} 🎉
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentSwiper;