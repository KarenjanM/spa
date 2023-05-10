import Image from 'next/image';

export default function FakeDoor(){
    return(
        <div className="flex flex-col place-items-center my-auto text-2xl">
            <div>Bedauerlicherweise ist diese Feature noch nicht implentiert worden.</div>
            <div>Danke, dass du dich für unsere Produkte interessierst.</div>
            <Image src={"/dog.gif"} width={100} height={100} alt={"dog thanking to customer GIF"}/>
        </div>
    )
}