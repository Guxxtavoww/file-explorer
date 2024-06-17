export function generateStaticParams() {
  return [{ paths: ['a', '1'] }, { paths: ['b', '2'] }, { paths: ['c', '3'] }];
}

export default function PathsPage({
  params: { paths },
}: {
  params: { paths: string[] };
}) {
  return <div>{paths.join(',')}</div>;
}
