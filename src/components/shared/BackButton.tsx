import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <div className="my-4 ">
      <Link className="ml-4" href={href}>
        <Button variant="beeDark">
          <ArrowLeft className="mr-2" />
          {text}
        </Button>
      </Link>
    </div>
  );
};
export default BackButton;
