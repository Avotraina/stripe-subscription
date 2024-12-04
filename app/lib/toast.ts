import { toast } from "sonner"


type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | null | undefined;
};

export const showToast = ({ title, description, variant = "default" }: ToastOptions) => {
//   toast({
//     title,
//     description,
//     variant,
    
//   });
    toast(title);
};