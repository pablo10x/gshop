import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types';




interface Delegation {
  name: string;
  cities: string[];
}

interface Governorate {
  name: string;
  delegations: Delegation[];
}

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(
    'https://raw.githubusercontent.com/Benyoubilel/TUNISIAN-CITIES-JSON/main/cities.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  const jsonData = await response.json();

  // Map to simpler structure
  const governorates = jsonData.Tunisia.governorates.map((gov: Governorate) => ({
    name: gov.name,
    delegations: gov.delegations.map(del => del.name)
  }));

  return {
    governorates : governorates
  };
};