import { getAllAccount, getSelectedAccount } from '@/api/services'
import { Inter } from 'next/font/google'
import Image from "next/image"

const inter = Inter({ subsets: ['latin'] })

export default function SlugPage({ data }) {
    return (
        <main
      className={`flex min-h-screen max-w-4xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}>
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
            <Image className="relative" layout="fill" objectFit="cover" src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.attributes.photo.data.attributes.url}`} alt={data.attributes.fullname} />
        </div>

        <div className="flex flex-col items-center gap-2 w-full mb-12">
          <h3 className="text-2xl font-bold">{data.attributes.fullname}</h3>
          <p className="text-lg">{data.attributes.bio}</p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
            {data.attributes.links.data.map((value, index) => {
                return (
                    <>
                    <a key={index} className="inline-flex items-center px-5 py-max text-center h-full w-full bg-indigo-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-[14px] p-4 hover:scale-105 transition-all cursor-pointer duration-200" href={value.attributes.url} target="_blank" rel="noopener noreferrer">

                    <Image width={50} height={50}src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.attributes.links.data[0].attributes.icon.data.attributes.formats.thumbnail.url}`} alt={`${data.attributes.links.data[0].attributes.icon.data.attributes.formats.thumbnail.name}`}/>
                        
                        {value.attributes.title}
                    
                    </a>
                    </>
                )
            })}
        </div>

    </main>
  )
}

// Hanya berlaku untuk pages routes next.js, tidak berlaku untuk app routes

// function yang nanti akan diexecute oleh next.js ketika project di build yang fungsinya untuk menghasilkan file .html apa saja berdasarkan dynamic routes-nya
export async function getStaticPaths() {
    // fetching data untuk keperluan ada dynamic routes apa saja
    const accounts = await getAllAccount();
    const dataAccounts = await accounts.data.data;
    
    // deklarasi variabel untuk menentukan ada slug/username apa saja yang nantinya menghasilkan file .html
    const paths = dataAccounts.map((value) => {
        return {
            params: {slug: value.attributes.slug},
        }
    })

    // memberi tahu next.js akan ada paths apa saja berdasarkan slug/username dari backend.
    // blocking tujuanny untuk nanti ketika user mengetik suatu path yang tidak ada di list slug, akan di return error/tidak ada
    return {paths, fallback: 'blocking'}
}

// function untuk get data yang nantinya akan dikirim ke component returnnya harus ada props dengan tipe data object, dan ada revalidate untuk menjalankan ISR nya
export async function getStaticProps({params}) {
    const selectedAccount = await getSelectedAccount(params.slug)

    return {
        props: {
            data: selectedAccount.data.data[0],
        },
        // Setiap 10 detik akan fetch ke backend apakah ada data baru atau tidak
        revalidate: 10 
    }
}