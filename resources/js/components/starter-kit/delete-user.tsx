import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/starter-kit/input-error';
import { Button } from '@/components/ui/starter-kit/button';
import { Input } from '@/components/ui/starter-kit/input';
import { Label } from '@/components/ui/starter-kit/label';

import HeadingSmall from '@/components/starter-kit/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/starter-kit/dialog';

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="space-y-6">
      <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Alerta</p>
          <p className="text-sm">Por favor, proceda com cautela, essa ação não pode ser desfeita.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Deletar Conta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Tem certeza que você deseja deletar sua conta</DialogTitle>
            <DialogDescription>
              Uma vez que sua conta for deletada, todos os seus dados também serão apagados. Insira sua senha
              para confirmar.
            </DialogDescription>
            <form className="space-y-6" onSubmit={deleteUser}>
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Senha
                </Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />

                <InputError message={errors.password} />
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancelar
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Deletar Conta</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
