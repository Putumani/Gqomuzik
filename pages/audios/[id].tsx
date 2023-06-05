import AudioPlayer from "@/components/AudioPlayer";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function AudioPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  console.log({ id });

  return <AudioPlayer id={id} url={""} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: { query: context.query},
    }
  }

  export default AudioPage;



  
  