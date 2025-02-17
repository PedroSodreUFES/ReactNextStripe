import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetail } from '@/styles/pages/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Stripe from 'stripe'

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl; // manda pra rota externa

            /* Se fosse uma rota externa seria:
            const router = useRouter()
            router.push("/checkout") */

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert("Falha ao redirecionar ao checkout")
        }
    }

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetail>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>
                    <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession} >Comprar agora</button>
                </ProductDetail>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: "prod_RbyMPk9ld151k3" } }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const productId = String(params!.id);

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hora
    }
}