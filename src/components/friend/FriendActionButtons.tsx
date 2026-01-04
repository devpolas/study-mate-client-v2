import { Button } from "../ui/button";

export function SendRequest() {
  return (
    <Button
      className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
      size='default'
      variant='secondary'
    >
      Send Request
    </Button>
  );
}
export function AcceptButton() {
  return (
    <Button
      className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
      size='default'
      variant='outline'
    >
      Send Request
    </Button>
  );
}
export function CancelRequest() {
  return (
    <Button
      className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
      size='default'
      variant='destructive'
    >
      Send Request
    </Button>
  );
}
export function DeleteFriend() {
  return (
    <Button
      className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
      size='default'
      variant='destructive'
    >
      Send Request
    </Button>
  );
}
