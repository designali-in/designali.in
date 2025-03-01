import crypto from "crypto";
import type { ComboBoxItemType } from "@/types";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { formatDistanceToNowStrict, intervalToDuration } from "date-fns";
import locale from "date-fns/locale/en-IN";
import ms from "ms";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

import { env } from "../env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function capitalizeFirstCharacter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
// text.charAt(0).toUpperCase() + text.slice(1);

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export const expirationTime = (
  expiration: string,
  updatedAt?: Date,
  timeOnly?: boolean,
): string => {
  if (!expiration || !updatedAt) return "Invalid data";
  if (expiration === "-1") return "Never";

  const expirationSeconds = parseInt(expiration, 10);
  if (isNaN(expirationSeconds)) return "Invalid expiration format";

  const now = Date.now();
  const updatedAtTimestamp = new Date(updatedAt).getTime();
  const expirationMilliseconds = expirationSeconds * 1000;
  const expirationTime = updatedAtTimestamp + expirationMilliseconds;
  const remainingTime = expirationTime - now;
  if (remainingTime <= 0) return "Expired";

  const remainingTimeString = ms(remainingTime, { long: true });
  if (timeOnly) {
    return remainingTimeString;
  }
  return `${remainingTimeString}`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function removeUrlSuffix(url: string): string {
  return url.startsWith("http") ? url.split("//")[1] : url;
}

// Utils from precedent.dev
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function generateUrlSuffix(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  const randomValues = new Uint8Array(length);
  // Use crypto.getRandomValues for browser compatibility
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(randomValues);
  } else {
    // Fallback to Node.js crypto module if in Node environment
    const crypto = require("crypto");
    const nodeRandomValues = crypto.randomBytes(length);
    randomValues.set(nodeRandomValues);
  }

  for (let i = 0; i < length; i++) {
    result += characters[randomValues[i] % charactersLength];
  }

  return result;
}

export function formatDescription(description: string, trim: number) {
  if (description.length > trim) {
    const trimmedDescription = description.slice(0, trim).trimEnd();
    return trimmedDescription + "...";
  }

  return description;
}

export function formatUrl(name: string, reverse?: boolean) {
  if (reverse) {
    return decodeURIComponent(name.split("-").join(" "));
  }

  return name.split(" ").join("-");
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function formatTimeLeft(expiryDate: Date) {
  const currentDate = new Date();

  const duration = intervalToDuration({ start: currentDate, end: expiryDate });

  if (!duration) return "Expired";

  const years = duration.years ?? 0;
  const months = duration.months ?? 0;
  const days = duration.days ?? 0;
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}

export function convertToSingleDecimalPlace(
  number: number,
  decimalPlaces: number,
) {
  const roundedNumber = number.toFixed(decimalPlaces);
  const singleDecimalPlace = parseFloat(roundedNumber).toFixed(1);

  return parseFloat(singleDecimalPlace);
}

export function getYearData() {
  const currentYear = new Date().getFullYear();
  const years: ComboBoxItemType[] = [];

  for (let i = currentYear; i >= 1980; i--) {
    years.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  return years;
}
