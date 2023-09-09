"use client"

import axios from "axios"
import * as z from "zod"
import { Download, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import Heading from '@/components/Heading'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/Empty"
import { Loader } from "@/components/Loader"
import { cn } from "@/lib/utils"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"

const ImagePage = () => {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            console.log(values)
            const response = await axios.post("/api/image", values)
            const urls = response.data.map(( image: { url: string })=> image.url)
            setImages(urls)
            form.reset()

        } catch (error: any) {
            console.log(error)
        }finally{
            router.refresh()
        }
    }

    return (
        <div>
            <Heading 
                title="Image Generation"
                description="Turn your prompt into image"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className='px-4 lg:px-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-smg grid grid-cols-12 gap-2"
                    >
                     <FormField 
                        name="prompt"
                        render={({ field })=>(
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormControl className="m-0 p-0">
                                    <Input 
                                    className="border-0 outline-none focus-visible:ring-0
                                    focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="A picture of a spiderman wearing hoodie"
                                    {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                     />
                     <FormField 
                        name="amount"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {amountOptions.map((i)=>(
                                            <SelectItem 
                                                key={i.value}
                                                value={i.value}
                                            >
                                                {i.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                     />
                     <FormField 
                        name="resolution"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {resolutionOptions.map((i)=>(
                                            <SelectItem 
                                                key={i.value}
                                                value={i.value}
                                            >
                                                {i.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                     />
                     <Button className="col-span-12 lg:col-span-2">
                        Generate
                     </Button>
                    </form>
                </Form>
                <div className="space-y-4 mt-4">
                        {isLoading && (
                            <div className="p-20">
                                <Loader />
                            </div>
                        )}
                        {images.length === 0 && !isLoading && (
                                <Empty label="Oops! No images generated." />
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {images.map((src)=>(
                                <Card 
                                    key={src}
                                    className="rounded-lg overflow-hidden m-2"
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            alt="image
                                            "
                                            fill
                                            src={src}
                                        />
                                    </div>
                                    <CardFooter className="p-2">
                                        <Button 
                                            onClick={()=> window.open(src) }
                                            variant="secondary" className="w-full">
                                            <Download 
                                                className="h-4 w-4 mr-2">
                                                Download
                                            </Download>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage