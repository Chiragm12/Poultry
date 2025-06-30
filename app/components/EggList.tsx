  "use client";

  import React, { useState, useEffect } from 'react';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner";

  interface EggRecord {
    id: string;
    date: string;
    crack_eggs: number;
    jumbo_eggs: number;
    normal_eggs: number;
    total_eggs: number;
    created_at: string;
  }

  const EggList = () => {
    const [eggRecords, setEggRecords] = useState<EggRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEggRecords = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/eggs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch egg records');
        }
        
        const data = await response.json();
        setEggRecords(data.records || []);
      } catch (error) {
        console.error('Error fetching egg records:', error);
        toast.error("Failed to load egg inventory data");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchEggRecords();
    }, []);

    if (loading) {
      return (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Egg Inventory Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">Loading...</div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Egg Inventory Records</CardTitle>
            <CardDescription>
              {eggRecords.length} record{eggRecords.length !== 1 ? 's' : ''} found
            </CardDescription>
          </div>
          <Button onClick={fetchEggRecords} variant="outline">
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {eggRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No egg inventory records found. Submit the form to see data here.
            </div>
          ) : (
            <div className="space-y-4">
              {eggRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">Egg Inventory Record</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Crack Eggs:</span> {record.crack_eggs}
                    </div>
                    <div>
                      <span className="font-medium">Jumbo Eggs:</span> {record.jumbo_eggs}
                    </div>
                    <div>
                      <span className="font-medium">Normal Eggs:</span> {record.normal_eggs}
                    </div>
                    <div>
                      <span className="font-medium">Total Eggs:</span> {record.total_eggs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  export default EggList;
