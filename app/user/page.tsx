'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/auth/useAuth';
import { fetchUserData } from '@/auth/authService';
import ProtectedRoute from '@/components/ProtectedRoute';
import Logo from '@/components/Logo/Logo';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Table from '@/components/Table/Table';
import Alert from '@/components/Alert/Alert';
import type { UserData, Purchase } from '@/types/user';
import './user-page.scss';

const purchaseColumns = [
  { key: 'id' as const, header: 'ID' },
  { key: 'item' as const, header: 'Item' },
  {
    key: 'price' as const,
    header: 'Preço',
    render: (value: unknown) => (
      <span className="dashboard__price">
        R$ {Number(value ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </span>
    ),
  },
];

function UserDashboard() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const data = await fetchUserData();
        if (!cancelled) {
          setUserData(data?.data ?? null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const axiosErr = err as { response?: { data?: { detail?: string } } };
          setError(axiosErr?.response?.data?.detail ?? 'Erro ao carregar dados');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  const handleLogout = useCallback(() => {
    logout?.();
  }, [logout]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div style={{ width: 32, height: 32, border: '3px solid #E7E8EB', borderTopColor: '#D22D2F', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          <p className="dashboard__loading-text">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-left">
          <Logo size="sm" />
          <span className="dashboard__greeting">
            Olá, <strong>{userData?.name ?? user?.username ?? 'Usuário'}</strong>
          </span>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          Sair
        </Button>
      </header>

      <main className="dashboard__content">
        {error ? (
          <Alert message={error} type="error" onClose={() => setError('')} />
        ) : null}

        <div className="dashboard__section">
          <h2 className="dashboard__section-title">Perfil</h2>
          <Card>
            <div className="dashboard__info-grid">
              <div className="dashboard__info-item">
                <div className="dashboard__info-item-label">Nome</div>
                <div className="dashboard__info-item-value">{userData?.name ?? '—'}</div>
              </div>
              <div className="dashboard__info-item">
                <div className="dashboard__info-item-label">Email</div>
                <div className="dashboard__info-item-value">{userData?.email ?? '—'}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard__section">
          <h2 className="dashboard__section-title">Compras</h2>
          <Card>
            <Table<Purchase & Record<string, unknown>>
              columns={purchaseColumns}
              data={(userData?.purchases ?? []) as (Purchase & Record<string, unknown>)[]}
              emptyMessage="Nenhuma compra encontrada"
            />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function UserPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <UserDashboard />
    </ProtectedRoute>
  );
}
