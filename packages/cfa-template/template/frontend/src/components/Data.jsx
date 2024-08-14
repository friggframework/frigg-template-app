import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useToast } from './ui/use-toast';

const Data = () => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const { integrationId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        history.replace('/logout');
      }

      const api = new API();
      api.setJwt(jwt);

      let sampleData = await api.getSampleData(integrationId);
      // let sampleData = getFakeData(); // Uncomment if you need fake data

      if (sampleData && sampleData.error) {
        toast({
          variant: 'destructive',
          title: 'Oops',
          description: sampleData.error,
        });
        return;
      }

      const getContent = () => {
        if (sampleData?.data) sampleData = sampleData.data;
        if (Array.isArray(sampleData) && sampleData.length > 0) {
          return {
            headers: Object.keys(sampleData[0]),
            rows: sampleData,
          };
        }
        if (typeof sampleData === 'object') {
          return {
            headers: Object.keys(sampleData),
            rows: [sampleData],
          };
        }
        return { headers: [], rows: [] };
      };

      const { headers, rows } = getContent();

      setHeaders(headers);
      setRows(rows);
    };
    fetchData();
  }, [integrationId]);

  // Fake data for testing
  const getFakeData = () => {
    return [
      { name: 'John Doe', age: 25, city: 'New York' },
      { name: 'Jane Doe', age: 22, city: 'Los Angeles' },
      { name: 'John Smith', age: 30, city: 'Chicago' },
      { name: 'Jane Smith', age: 28, city: 'Houston' },
    ];
  };

  return headers.length > 0 ? (
    <div className="m-3 border rounded">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h, idx) => (
              <TableHead key={idx}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, idx) => (
            <TableRow key={idx}>
              {Object.values(item).map((val, idxVal) => (
                <TableCell key={idxVal}>{`${val}`}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="flex w-full justify-center m-5">
      <h1 className="text-lg">No data available</h1>
    </div>
  );
};

export default Data;
