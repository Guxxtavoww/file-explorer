import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { useChooseVolumes } from './choose-volumes.hook';

export function ChooseVolumes() {
  const { handleVolumeClick, isLoading, volumes } =
    useChooseVolumes();

  if (isLoading) {
    return (
      <div className="space-y-2 text-center">
        <div className="flex items-center w-full space-x-3">
          <Skeleton className="h-44 flex-[1]" />
          <Skeleton className="h-44 flex-[1]" />
          <Skeleton className="h-44 flex-[1]" />
        </div>
        <h2>
          Aguarde enquanto estamos casheando seus arquivos. Isso pode demorar
          alguns minutos
        </h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {volumes?.map((volume, index) => (
        <button
          key={index}
          className="transition-all hover:shadow-lg flex-[1]"
          onClick={() => handleVolumeClick(volume.mountpoint)}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{volume.name}</CardTitle>
              <CardDescription>Letra: {volume.mountpoint}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start w-full gap-2">
                <Label>Gigas Disponiveis: {volume.available_gb}</Label>
                <Progress value={(volume.used_gb / volume.total_gb) * 100} />
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </div>
  );
}
