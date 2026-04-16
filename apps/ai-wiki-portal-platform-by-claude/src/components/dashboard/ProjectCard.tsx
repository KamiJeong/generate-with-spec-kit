import { Card, CardContent, CardHeader, CardTitle, Progress } from '@kamijeong/ui';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@wiki/components/shared/StatusBadge';
import { projectDetailPath } from '@wiki/routes';
import type { Project } from '@wiki/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="border-border/70 transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            <Link
              to={projectDetailPath(project.id)}
              className="hover:underline focus:underline"
            >
              {project.name}
            </Link>
          </CardTitle>
          <StatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>진행률</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} max={100} aria-label={`${project.name} 진행률`} />
        </div>
        <div className="flex items-center gap-1">
          {project.participants.map((p) => (
            <img
              key={p.id}
              src={p.avatarUrl}
              alt={p.name}
              title={p.name}
              className="size-6 rounded-full border border-border"
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {project.participants.length}명 참여
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
