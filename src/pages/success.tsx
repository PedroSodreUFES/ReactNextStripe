import { ImageContainer, SucessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success(){
    return (
        <SucessContainer>
            <h1>Compra efetuada</h1>

            <ImageContainer>

            </ImageContainer>

            <p>
                Uhull{' '}<strong>Pedro Sodré</strong>, sua{' '}<strong>Camiseta</strong> já está a caminho de sua casa!
            </p>

            <Link href='/'>
                Voltar ao catálogo
            </Link>
        </SucessContainer>
    )
}