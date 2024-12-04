import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";

type T_SubmitButton = {
    isPending: boolean,
    label?: string,
}

export const SubmitButton: React.FC<T_SubmitButton> = ({isPending, label}: T_SubmitButton) => {

    if (isPending) {
        
        return (
            <Button className="w-1/4" disabled>
                <Loader2 className="animate-spin" />
                {label ?? 'Submit'}
            </Button>
        )
    }

    if (!isPending) {
        return (
            <Button className="w-1/4" type="submit">{label ?? 'Submit'}</Button>
        );
    }


}