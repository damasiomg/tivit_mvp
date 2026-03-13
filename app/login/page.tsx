'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/useAuth';
import { checkHealth } from '@/auth/authService';
import Logo from '@/components/Logo/Logo';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Alert from '@/components/Alert/Alert';
import './login-page.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login, clearApiError, isAuthenticated, isLoading, error, user, } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);
  const [healthChecking, setHealthChecking] = useState(true);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      router.replace(user.role === 'admin' ? '/admin' : '/user');
    }
  }, [isAuthenticated, user?.role, router]);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const health = await checkHealth();
        if (!cancelled) {
          setApiHealthy(health?.status === 'ok');
        }
      } catch (e: unknown) {
        void e;
        if (!cancelled) {
          setApiHealthy(false);
        }
      } finally {
        if (!cancelled) {
          setHealthChecking(false);
        }
      }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setLoginError('');

    if (!username?.trim?.()) {
      setLoginError('Informe o usuário');
      return;
    }
    if (!password?.trim?.()) {
      setLoginError('Informe a senha');
      return;
    }

    try {
      const result = await login({ username: username.trim(), password });
      const role = result?.role ?? 'user';
      router.replace(role === 'admin' ? '/admin' : '/user');
    } catch (err: unknown) {
      const msg = (err as Error)?.message ?? 'Erro ao fazer login';
      console.log('erro 1 ao logar:', err);
      setLoginError(msg);
    }
  }, [username, password, login, router]);

  const handleRetry = useCallback(() => {
    setHealthChecking(true);
    setApiHealthy(null);
    checkHealth()
      .then((h) => setApiHealthy(h?.status === 'ok'))
      .catch(() => setApiHealthy(false))
      .finally(() => setHealthChecking(false));
  }, []);

  
  const clearPageErros = useCallback(() => {
    clearApiError();
    setLoginError('');
  }, []);



  if (healthChecking) {
    return (
      <div className="login-page">
        <div className="login-page__container">
          <Card className="login-page__card">
            <Logo size="lg" className="login-page__logo" />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
              <div style={{ width: 32, height: 32, border: '3px solid #E7E8EB', borderTopColor: '#D22D2F', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
            </div>
            <p style={{ color: '#898E94', fontSize: '0.875rem' }}>Verificando disponibilidade da API...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (apiHealthy === false) {
    return (
      <div className="login-page">
        <div className="login-page__container">
          <Card className="login-page__card">
            <Logo size="lg" className="login-page__logo" />
            <div className="login-page__unavailable">
              <h2 className="login-page__unavailable-title">API Indisponível</h2>
              <p className="login-page__unavailable-text">
                Não foi possível conectar ao servidor. Tente novamente em alguns instantes.
              </p>
              <Button onClick={handleRetry} variant="primary">
                Tentar Novamente
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-page__container">
        <Card className="login-page__card">
          <Logo size="lg" className="login-page__logo" />
          <p className="login-page__subtitle">Faça login para acessar o sistema</p>

          {(loginError || error) ? (
            <Alert
              message={loginError || error || ''}
              type="error"
              onClose={clearPageErros}
            />
          ) : null}

          <form className="login-page__form" onSubmit={handleSubmit}>
            <Input
              id="username"
              label="Usuário"
              value={username}
              onChange={setUsername}
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
            <div className="login-page__submit">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Entrar
              </Button>
            </div>
          </form>

          <div className="login-page__status">
            <span className="login-page__status-dot" />
            <span>API conectada</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
