import { API_URL } from '../../constants/constants';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export const createContract = async (values, userId) => {
  const res = await fetchWithAuth(`${API_URL}/business/contract`, {
    method: 'POST',
    body: JSON.stringify({ values, userId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create contract');
  }
  return true;
};

export const deleteContract = async (contractId) => {
  const res = await fetchWithAuth(
    `${API_URL}/business/contract/${contractId}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('Failed to delete contract');
  return true;
};

export const updateContract = async (contract) => {
  const res = await fetchWithAuth(
    `${API_URL}/business/contract/${contract.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(contract),
    }
  );
  if (!res.ok) throw new Error('Error saving contract changes');
  return true;
};

export const getContractsForBusiness = async (uid) => {
  const res = await fetchWithAuth(`${API_URL}/business/contracts/${uid}`);
  if (!res.ok) throw new Error('Error fetching contracts');
  const data = await res.json();
  return data.contracts || [];
};

export const unassignContractor = async (contractId) => {
  const res = await fetchWithAuth(
    `${API_URL}/business/contracts/${contractId}/unassign`,
    {
      method: 'PUT',
    }
  );
  if (!res.ok) throw new Error('Failed to unassign contractor');
  return true;
};
