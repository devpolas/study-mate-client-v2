import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type ActionType = "send" | "accept" | "cancel" | "unfriend";

type ActionConfig = {
  label: string;
  variant: "default" | "secondary" | "outline" | "destructive";
};

interface Props {
  action: ActionType;
  onClick: () => void;
  isLoading?: boolean;
}

export default function FriendActionButton({
  action,
  onClick,
  isLoading = false,
}: Props) {
  const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
    send: {
      label: "Send Request",
      variant: "secondary",
    },
    accept: {
      label: "Accept Request",
      variant: "outline",
    },
    cancel: {
      label: "Cancel Request",
      variant: "destructive",
    },
    unfriend: {
      label: "Unfriend",
      variant: "destructive",
    },
  };
  const { label, variant } = ACTION_CONFIG[action];

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={variant}
      className='hover:shadow-md transition hover:-translate-y-0.5 hover:cursor-pointer'
    >
      {isLoading ? (
        <Badge variant='outline'>
          <Spinner />
          Processing
        </Badge>
      ) : (
        label
      )}
    </Button>
  );
}
