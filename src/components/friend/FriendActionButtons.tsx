import { Button } from "../ui/button";

export default function FriendActionButtons({ ...props }) {
  function SendRequest() {
    return (
      <Button
        {...props}
        className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
        size='default'
        variant='secondary'
      >
        Send Request
      </Button>
    );
  }
  function AcceptRequest() {
    return (
      <Button
        {...props}
        className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
        size='default'
        variant='outline'
      >
        Send Request
      </Button>
    );
  }
  function CancelRequest() {
    return (
      <Button
        {...props}
        className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
        size='default'
        variant='destructive'
      >
        Send Request
      </Button>
    );
  }
  function DeleteFriend() {
    return (
      <Button
        {...props}
        className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
        size='default'
        variant='destructive'
      >
        Send Request
      </Button>
    );
  }
  return { SendRequest, AcceptRequest, CancelRequest, DeleteFriend };
}
