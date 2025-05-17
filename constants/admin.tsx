import { LayoutDashboard, ReceiptText, Mails, Mailbox, BadgeDollarSign, Send, WalletCards, Coins, Building, HandCoins, CreditCard, UserPlus, Contact, UserSearch, ClipboardList, BookUser, ShoppingBag, Warehouse, ClipboardPenLine, ScrollText, Settings, UsersRound, List, UserRound, UserRoundCheck, MailboxIcon, MailPlus, ListOrdered, ListFilter, BookAIcon, BookText, BookType, BookTemplate, BookPlus, UserPlus2 } from "lucide-react";

interface NavLinks {
  icon?: React.ReactNode | string;
  name: string;
  url: string;
}

export const urls = {
  basePath: '/',
}

export const adminNavItems:NavLinks[] = [
    {
      name: "Dashboard",
      icon:  <LayoutDashboard />,
      url: urls.basePath,
    },
  ];

 
export const permissions = {
  admin: ['ADMIN', ],
  accountant: ['ADMIN', 'ACCOUNTANT', 'DEVELOPER' ],
  mgt: ['ADMIN', 'ACCOUNTANT', 'MANAGER', 'DEVELOPER'  ],
  transactions: ['ADMIN', 'ACCOUNTANT', 'MANAGER', 'CUSTOMER SERVICE', 'DEVELOPER'],
  assets: ['ADMIN', 'ACCOUNTANT', 'MANAGER', 'PROJECTS', 'DEVELOPER' ],
  galleria: ['ADMIN', 'ACCOUNTANT', 'MANAGER', 'GALLERIA', 'DEVELOPER'],
  staff: ['ADMIN', 'ACCOUNTANT', 'MANAGER', 'CUSTOMER SERVICE', 'PROJECTS', 'STAFF', 'ANONIMOUS', 'DEVELOPER'],
}


export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
