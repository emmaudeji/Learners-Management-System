import { Plane, Map, FileText, GraduationCap,  } from 'lucide-react';
import React from 'react';
 
export const fields = {
  heroBanner: ["id", "url","type","description","header", "cta","createdAt","createdBy"],
  tours: [
    "id",
    "place",
    "details",
    "offers",
    "price",
    "currency",
    "isFree",
    "cover_img",
    "gallery",
    "package",
    "type",
    "rate",
    "offer_limit",
    "createdBy"
  ],
  feedback: [
     'id', 'name', 'socialMediaLink', 'testimony', 'imgUrl', 'title', 'email', 'rating','createdAt'
  ],
  category: ['label', 'value',],
  blog: [
    "id",
    "slug",
    "title",
    // "content",
    "category",
    // "tags",
    "views",
    "likes",
    "image",
    "package",
    // "author",
    // "status",
    "publishedDate",
    // "createdBy"
  ],
  post: [
    "id",
    "slug",
    "title",
    "content",
    "category",
    "tags",
    "views",
    "likes",
    "image",
    "package",
    "author",
    "excerpts",
    "publishedDate",
    // "createdBy"
  ],
  user:[
    "fullName",
    "email",
    "accountId",
    "role",
    "bio",
    "address",
    "phone",
    "avatar",
    "status",
    "id",
    "createdAt",
    "updatedAt",
  ],
  newUser:[
    "fullName",
    "email",
    "createdBy",
    "role",
    "id",
    "status",
    "createdAt",
    "updatedAt",
  ],
}

export const categoryOptions = {
  featured:['visa','Travelling', 'schooling'],
  trending:['lifestyle','technology','destination' ],
  beststories:['wellness','schoolling','romance','lifestyle', ],
  discoveries:['visa','Travelling', 'business'],
  destinations:['Destination','Travelling', 'romance'],
  bestTwo:['Visa','Travelling'],
}

export const TOUROFFERS = [
  { label: "Accommodations", value: "Accommodations" },
  { label: "Airport Transfer", value: "Airport Transfer" },
  { label: "Taxes", value: "Taxes" },
  { label: "Travel Insurance", value: "Travel Insurance" },
  { label: "Breakfast & Dinner", value: "Breakfast & Dinner" },
  { label: "Tours", value: "Tours" },
];

export const TOURPACKAGES = [
  { label: "Group Excursion", value: "Group Excursion" },
  { label: "Individual Visa Services", value: "Individual Visa Services" },
  { label: "Family Adventures", value: "Family Adventures" },
  { label: "Educational Expeditions for Kids", value: "Educational Expeditions for Kids" },
];

export const CURRENCIES = [
  { label: "British Pound Sterling £", value: "£" },
  { label: "United States Dollar $", value: "USD" },
  { label: "Australian Dollar AUD", value: "AUD" },
  { label: "Canadian Dollar $", value: "CAD" },
  { label: "Chinese Yuan ¥", value: "¥" },
  { label: "Euro €", value: "€" },
  { label: "Ghanaian Cedi ₵", value: "₵" },
  { label: "Moroccan Dirham د.م.", value: "د.م." },
  { label: "Nigerian Naira ₦", value: "₦" },
];


export const TOURTYPES = [
  { label: "Per Person", value: "Per Person" },
  { label: "For 2 Adults", value: "For 2 Adults" },
  { label: "Group", value: "Group" },
  { label: "Processing Fee", value: "Processing Fee" },
]

export const settings = {
  COUNTLIMIT: 20,
  REVALIDATE_TIME: 3,
}

export const reactquilToolbar = {
  toolbar:[
    [{ font: ['sans-serif', 'serif', 'monospace', 'cursive'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: ['', 'center', 'right', 'justify'] }],
    ['image'], // ✅ Enable image upload button
    ['clean'],
  ],
}