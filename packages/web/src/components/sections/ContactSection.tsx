import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Card, CardContent, Field, Input, Textarea } from '@kamijeong/ui';

import { siteConfig } from '@web/content/site';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit() {
    setIsSubmitted(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-muted/30"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary">문의</p>
          <h2 id="contact-heading" className="text-3xl font-semibold">
            서비스 소개가 필요하다면 바로 이야기해 주세요.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            이름, 이메일, 메시지를 남기면 내부 검토 후 다음 연락 흐름으로
            이어갈 수 있습니다. 현재 제출은 화면 내 성공 메시지로만 처리됩니다.
          </p>
        </div>

        <Card className="rounded-lg border-border/70 bg-card">
          <CardContent className="p-6">
            <form
              aria-labelledby="contact-heading"
              className="grid gap-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Field
                label="이름"
                required
                error={errors.name?.message}
                aria-required="true"
              >
                <Input
                  aria-label="이름"
                  aria-required="true"
                  autoComplete="name"
                  {...register('name', {
                    required: '이름을 입력해주세요',
                    onChange: () => setIsSubmitted(false),
                  })}
                />
              </Field>

              <Field
                label="이메일"
                required
                error={errors.email?.message}
                aria-required="true"
              >
                <Input
                  type="email"
                  aria-label="이메일"
                  aria-required="true"
                  autoComplete="email"
                  {...register('email', {
                    required: '이메일 형식이 올바르지 않습니다',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '이메일 형식이 올바르지 않습니다',
                    },
                    onChange: () => setIsSubmitted(false),
                  })}
                />
              </Field>

              <Field
                label="메시지"
                required
                error={errors.message?.message}
                aria-required="true"
              >
                <Textarea
                  aria-label="메시지"
                  aria-required="true"
                  rows={5}
                  {...register('message', {
                    required: '메시지를 10자 이상 입력해주세요',
                    minLength: {
                      value: 10,
                      message: '메시지를 10자 이상 입력해주세요',
                    },
                    onChange: () => setIsSubmitted(false),
                  })}
                />
              </Field>

              <Button type="submit" size="lg" className="w-full sm:w-fit">
                {siteConfig.ctaLabel}
              </Button>

              {isSubmitted ? (
                <p
                  className="rounded-md border bg-background px-4 py-3 text-sm text-foreground"
                  role="status"
                >
                  문의가 접수되었습니다. 다음 단계에서 실제 전송 연동을 연결할
                  수 있습니다.
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
