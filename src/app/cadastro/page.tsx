"use client";

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import Link from "next/link"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
} from "@/components/ui/sheet"
import { useState } from 'react';
import ProdutoTable from '../lerprod/page';

function formatDateToMySQL(dateString: any) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export default function Cadastro() {    
    const [formData, setFormData] = useState({
        categoria: '',
        nome: '',
        marca: '',
        quantidade: '',
        valor_total: '',
        data_compra: '',
        validade: ''
    });

    async function insertProd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        // Converter datas para o formato MySQL
        const formattedFormData: { [key: string]: string | null } = {
            categoria: formData.categoria || null,
            nome: formData.nome,
            marca: formData.marca || null,
            quantidade: formData.quantidade,
            valor_total: formData.valor_total,
            data_compra: formatDateToMySQL(formData.data_compra),
            validade: formData.validade ? formatDateToMySQL(formData.validade) : null
        };

        const response = await fetch('http://localhost:3000/api/inserirprod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedFormData),
        });

        console.log('Dados do formulário antes de serem enviados para a API:', formattedFormData);

        if (!response.ok) {
            console.error("Erro ao inserir produto:", response.statusText);
        } else {
            console.log("Produto inserido com sucesso");
            window.location.reload(); // Recarregar a página após o sucesso
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Gestor</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Home className="h-4 w-4" />
                                Início
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Package className="h-4 w-4" />
                                Cadastro
                            </Link>
                            <Link
                                href="/inventario"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <LineChart className="h-4 w-4" />
                                Inventário
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Algum problema?</CardTitle>
                                <CardDescription>
                                    Entre em contato conosco:<br />gestor@suporte.com
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu de navegação</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Gestor</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Início
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Cadastro
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Inventário
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Algum problema?</CardTitle>
                                        <CardDescription>
                                            Entre em contato conosco:<br />gestor@suporte.com
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Menu de Usúario</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Configurações</DropdownMenuItem>
                            <DropdownMenuItem>Suporte</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Cadastro</h1>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>Cadastrar</Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Área de cadastro</SheetTitle>
                                    <SheetDescription>
                                        Faça o cadastro de produtos/serviços, depois salve para a lista se atualizar.
                                    </SheetDescription>
                                </SheetHeader>
                                <form onSubmit={insertProd}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="categoria" className="text-right">
                                                Categoria
                                            </Label>
                                            <Input name="categoria" type="text" placeholder="" className="col-span-3" onChange={handleChange} value={formData.categoria} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="nome" className="text-right">
                                                Nome
                                            </Label>
                                            <Input name="nome" type="text" placeholder="" className="col-span-3" onChange={handleChange} value={formData.nome} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="marca" className="text-right">
                                                Marca
                                            </Label>
                                            <Input name="marca" type="text" placeholder="" className="col-span-3" onChange={handleChange} value={formData.marca} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="quantidade" className="text-right">
                                                Quantidade
                                            </Label>
                                            <Input name="quantidade" type="text" placeholder="" required className="col-span-3" onChange={handleChange} value={formData.quantidade} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="valor_total" className="text-right">
                                                Valor total
                                            </Label>
                                            <Input name="valor_total" type="text" placeholder="" className="col-span-3" onChange={handleChange} value={formData.valor_total} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="data_compra" className="text-right">
                                                Data compra
                                            </Label>
                                            <Input name="data_compra" type="text" placeholder="" required className="col-span-3" onChange={handleChange} value={formData.data_compra} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="validade" className="text-right">
                                                Validade
                                            </Label>
                                            <Input name="validade" type="text" placeholder="" className="col-span-3" onChange={handleChange} value={formData.validade} />
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">Salvar</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </form>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <ProdutoTable />
                </main>
            </div>
        </div>
    )
}