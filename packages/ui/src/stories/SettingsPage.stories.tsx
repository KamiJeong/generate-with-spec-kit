import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/card';
import { Label } from '../components/label';
import { Separator } from '../components/separator';
import { Switch } from '../components/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';

const meta = {
  title: 'Pages/SettingsPage',
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">설정</h1>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
              <CardDescription>기본 계정 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label>다크 모드</Label>
                  <p className="text-sm text-muted-foreground">
                    어두운 테마를 사용합니다.
                  </p>
                </div>
                <Switch aria-label="다크 모드" />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label>자동 저장</Label>
                  <p className="text-sm text-muted-foreground">
                    변경사항을 자동으로 저장합니다.
                  </p>
                </div>
                <Switch aria-label="자동 저장" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    중요 업데이트를 이메일로 받습니다.
                  </p>
                </div>
                <Switch aria-label="이메일 알림" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label>마케팅 수신</Label>
                  <p className="text-sm text-muted-foreground">
                    프로모션 및 뉴스레터를 받습니다.
                  </p>
                </div>
                <Switch aria-label="마케팅 수신" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label>2단계 인증</Label>
                  <p className="text-sm text-muted-foreground">
                    로그인 시 추가 인증을 요구합니다.
                  </p>
                </div>
                <Switch aria-label="2단계 인증" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">계정 삭제</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
