'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/auth/useAuth';
import { fetchAdminData } from '@/auth/authService';
import ProtectedRoute from '@/components/ProtectedRoute';
import Logo from '@/components/Logo/Logo';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Table from '@/components/Table/Table';
import Alert from '@/components/Alert/Alert';
import type { UserData, Report } from '@/types/user';
import '../user/user-page.scss';

const reportColumns = [
  { key: 'id' as const, header: 'ID' },
  { key: 'title' as const, header: 'Relatório' },
  {
    key: 'status' as const,
    header: 'Status',
    render: (value: unknown) => {
      const status = String(value ?? '').toLowerCase();
      const cls = status === 'completed' ? 'completed' : 'pending';
      const label = status === 'completed' ? 'Concluído' : 'Pendente';
      return <span className={`dashboard__status dashboard__status--${cls}`}>{label}</span>;
    },
  },
];

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [adminData, setAdminData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const data = await fetchAdminData();
        if (!cancelled) {
          setAdminData(data?.data ?? null);
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
            Olá, <strong>{adminData?.name ?? user?.username ?? 'Admin'}</strong>
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
          <h2 className="dashboard__section-title">Informações</h2>
          <Card>
            <div className="dashboard__info-grid">
              <div className="dashboard__info-item">
                <div className="dashboard__info-item-label">Nome</div>
                <div className="dashboard__info-item-value">{adminData?.name ?? '—'}</div>
              </div>
              <div className="dashboard__info-item">
                <div className="dashboard__info-item-label">Email</div>
                <div className="dashboard__info-item-value">{adminData?.email ?? '—'}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard__section">
          <h2 className="dashboard__section-title">Relatórios</h2>
          <Card>
            <Table<Report & Record<string, unknown>>
              columns={reportColumns}
              data={(adminData?.reports ?? []) as (Report & Record<string, unknown>)[]}
              emptyMessage="Nenhum relatório encontrado"
            />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
