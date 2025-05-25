
export const fields = {
  heroBanner: ["id", "url","type","description","header", "cta","createdAt","createdBy"],
  courses: [
    "id",            // from Appwrite's document ID ($id)
    "createdAt",     // from Appwrite's $createdAt
    "updatedAt",     // from Appwrite's $updatedAt
    "createdBy",     // likely a user relationship
    "alias",
    "title",
    "description",
    "status",
    "section",
    "chapters",
    "reviews",
    "feedbacks",
    "objectives",
    "imageUrl",
    "createdBy",
    "price",
    "permissions",
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
 
}

export const statuses = ["DRAFT", "ACTIVE", "ARCHIVED"] 

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