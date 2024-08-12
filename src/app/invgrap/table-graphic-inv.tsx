"use client";

import { useState, useEffect, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ResponsiveLine } from "@nivo/line"

interface Product {
  id: number;
  categoria: string;
  nome: string;
  marca: string;
  quantidade: number;
  valor_total: number;
  data_compra: string;
  validade: string;
}

export default function TableGraphicInv() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 3

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lerprodinv')
      const data: Product[] = await response.json()
      console.log("Fetched products:", data) // Depuração
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const totalPages = Math.ceil(products.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const productData = useMemo(() => {
    const data = products.reduce((acc: { [key: number]: number[] }, product: Product) => {
      const purchaseDate = new Date(product.data_compra)
      const purchaseYear = purchaseDate.getFullYear()
      const purchaseMonth = purchaseDate.getMonth()

      if (isNaN(purchaseYear) || isNaN(purchaseMonth)) {
        console.warn("Invalid date for product:", product)
        return acc
      }

      if (!acc[purchaseYear]) {
        acc[purchaseYear] = Array(12).fill(0)
      }
      acc[purchaseYear][purchaseMonth] += product.quantidade
      return acc
    }, {})
    console.log("Product data:", data) // Depuração
    return data
  }, [products])

  const lineChartData = useMemo(() => {
    const data = Object.entries(productData).map(([year, months]) => ({
      id: year,
      data: (months as number[]).map((quantidade: number, index: number) => ({
        x: new Date(parseInt(year), index).toLocaleString('default', { month: 'short' }),
        y: quantidade,
      })),
    }))
    console.log("Line chart data:", data) // Depuração
    return data;
  }, [productData]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Produtos por Mês</CardTitle>
          <CardDescription>Quantidade de produtos/serviços adquiridos por mês.</CardDescription>
        </CardHeader>
        <CardContent>
          {lineChartData.length > 0 ? (
            <LineChart className="aspect-[9/4]" data={lineChartData} />
          ) : (
            <p>Carregando gráfico...</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Informações sobre os registros.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Data de Compra</TableHead>
                <TableHead>Validade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>{product.nome}</TableCell>
                  <TableCell>{product.marca}</TableCell>
                  <TableCell>{product.quantidade}</TableCell>
                  <TableCell>{product.valor_total}</TableCell>
                  <TableCell>{product.data_compra}</TableCell>
                  <TableCell>{product.validade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  )
}

interface LineChartProps {
  data: {
    id: string;
    data: { x: string; y: number }[];
  }[];
  className?: string;
}

function LineChart({ data, className, ...props }: LineChartProps) {
  return (
    <div className={className} {...props}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: { borderRadius: "9999px" },
            container: { fontSize: "12px", textTransform: "capitalize", borderRadius: "6px" },
          },
          grid: { line: { stroke: "#f3f4f6" } },
        }}
        role="application"
      />
    </div>
  )
}
