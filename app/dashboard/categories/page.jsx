"use client"

import React, { useEffect, useState } from 'react';
import { DataTable } from './features/data-table';
import { columns } from './features/columns';
import { 
  Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle
  } from '@/components/ui/card';
import{ Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';

function page() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Fetch categories from your API
    axiosInstance
      .get('/api/categories')
      .then((response) => {
        const apiData = response.data.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          documentId: item.documentId,
        }));
        setCategories(apiData);
      })
      .catch((error) => {
        console.log('Error fetching categories:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  // temporary data until API integration is done by koya ^_^



  return (
    <div className='py-4 md:py-6 px-4 lg:px-6'>
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            <span>list of categories</span>
          </CardDescription>

          <CardAction>
            <Button className='btn btn-sm btn-primary'>Add New</Button>
          </CardAction>

        </CardHeader>
        <CardContent>
          {loading? <p className='text-muted-foreground'>Loading...</p>:
          <DataTable columns={columns} data={categories} />
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default page