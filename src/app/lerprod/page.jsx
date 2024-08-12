"use client";
import './style.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"  
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

function ProdutoTableComponent() {
    const [produtos, setProdutos] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/lerprod');
                const data = await response.json();
                console.log('Dados recebidos da API:', data);

                // Certifique-se de que o data seja um array
                if (Array.isArray(data)) {
                    setProdutos(data);
                } else {
                    console.error('Dados retornados não são um array:', data);
                    setProdutos([]);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setProdutos([]);
            }
            setIsHydrated(true);
        };

        fetchProdutos();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/api/deletarprod', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            if (result.success) {
                setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== id));
            } else {
                console.error('Erro ao apagar produto:', result.error);
            }
        } catch (error) {
            console.error('Erro ao apagar produto:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!isHydrated) {
        return <div>Carregando...</div>;
    }

    // Verifique se produtos é um array antes de usar slice
    const displayedProducts = Array.isArray(produtos) ? produtos.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];
    console.log('Produtos a serem exibidos:', displayedProducts);

    return (
        //<div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"></div>
        <div className='principalDivCad'>
            <div className='tabelaCad'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Categ.</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Qntd.</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Data Compra</TableHead>
                        <TableHead>Validade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedProducts.length > 0 ? displayedProducts.map((produto) => (
                        <TableRow key={produto.id}>
                            <TableCell>{produto.id}</TableCell>
                            <TableCell>{produto.categoria}</TableCell>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell>{produto.marca}</TableCell>
                            <TableCell>{produto.quantidade}</TableCell>
                            <TableCell>{produto.valor_total}</TableCell>
                            <TableCell>{produto.data_compra}</TableCell>
                            <TableCell>{produto.validade}</TableCell>
                            <TableCell className='text-right'>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button>Apagar</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Se apagar por engano, terá que readicionar o registro.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(produto.id)}>Sim, apagar.</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan="8">Nenhum produto encontrado/cadastrado.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
                <div className='indicePaginaCad'>
                {Array.from({ length: Math.ceil(produtos.length / itemsPerPage) }, (_, index) => (
                    <Button className='botaoIndice' key={index} variant={"outline"} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Button>
                ))}
                </div>
        </div>
    );
}

export default function ProdutoTable() {
    return <ProdutoTableComponent />;
}
