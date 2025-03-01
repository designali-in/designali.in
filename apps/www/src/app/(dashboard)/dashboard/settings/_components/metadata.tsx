"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Metadata() {
  const [metadata, setMetadata] = useState({
    ip: "Loading...",
    city: "Loading...",
    country: "Loading...",
    browser: "Loading...",
    os: "Loading...",
    device: "Loading...",
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch("/api/other/metadata");

        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }

        const data = await response.json();

        setMetadata(data);
      } catch (_error) {
        setError(true);
      }
    }

    fetchMetadata();
  }, []);

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div>
      <h2 className="text-sm font-semibold capitalize">{label}</h2>
      <p className="text-gray-400">{value}</p>
    </div>
  );

  const metadataItems = useMemo(() => {
    if (error) {
      return Object.keys(metadata).map((key) => (
        <InfoItem key={key} label={key} value="Error" />
      ));
    }

    return Object.entries(metadata).map(([key, value]) => {
      // Convert non-string values to strings
      const displayValue =
        typeof value === "object" ? JSON.stringify(value) : value;
      return <InfoItem key={key} label={key} value={displayValue} />;
    });
  }, [metadata, error]);

  return (
    <div>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
          <CardDescription>
            Your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">{metadataItems}</div>
        </CardContent>
      </Card>
    </div>
  );
}
