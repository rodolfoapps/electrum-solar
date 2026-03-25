'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  propertyType: string;
  fullAddress: string;
  averageEnergyBill: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  homeowner: string;
  projectDescription: string;
  sourcePage: string;
}

const PROPERTY_TYPES = ['Residential', 'Commercial'];
const ENERGY_BILLS = ['$0-$100', '$100-$200', '$200-$300', '$300-$400', '$400-$500', '$500+'];

export function QuoteRequestForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    fullAddress: '',
    averageEnergyBill: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    homeowner: '',
    projectDescription: '',
    sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function validate(): boolean {
    if (!formData.propertyType) {
      setError('Please select residential or commercial.');
      return false;
    }
    if (!formData.fullAddress.trim()) {
      setError('Please enter your full address.');
      return false;
    }
    if (!formData.averageEnergyBill) {
      setError('Please select your average energy bill.');
      return false;
    }
    if (!formData.firstName.trim()) {
      setError('Please enter your first name.');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Please enter your last name.');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return false;
    }
    if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.homeowner) {
      setError('Please indicate if you are the homeowner.');
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        sourcePage: window.location.pathname,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      router.push('/thank-you/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none';
  const selectClass =
    'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Property Type */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700">
            Property Type <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {PROPERTY_TYPES.map((type) => (
              <label
                key={type}
                className={`cursor-pointer rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
                  formData.propertyType === type
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={formData.propertyType === type}
                  onChange={(e) => updateField('propertyType', e.target.value)}
                  className="sr-only"
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Full Address */}
        <div>
          <label htmlFor="fullAddress" className="mb-1 block text-sm font-medium text-gray-700">
            Full Address <span className="text-red-500">*</span>
          </label>
          <input
            id="fullAddress"
            type="text"
            value={formData.fullAddress}
            onChange={(e) => updateField('fullAddress', e.target.value)}
            placeholder="123 Main St, City, State, ZIP"
            className={inputClass}
          />
        </div>

        {/* Average Energy Bill */}
        <div>
          <label htmlFor="averageEnergyBill" className="mb-1 block text-sm font-medium text-gray-700">
            Average Energy Bill <span className="text-red-500">*</span>
          </label>
          <select
            id="averageEnergyBill"
            value={formData.averageEnergyBill}
            onChange={(e) => updateField('averageEnergyBill', e.target.value)}
            className={selectClass}
          >
            <option value="">Select your average monthly bill</option>
            {ENERGY_BILLS.map((bill) => (
              <option key={bill} value={bill}>{bill}</option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="First name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              placeholder="Last name"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        {/* Homeowner */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700">
            Are you the homeowner? <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {['Yes', 'No'].map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
                  formData.homeowner === option
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="homeowner"
                  value={option}
                  checked={formData.homeowner === option}
                  onChange={(e) => updateField('homeowner', e.target.value)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Project Description (optional) */}
        <div>
          <label htmlFor="projectDescription" className="mb-1 block text-sm font-medium text-gray-700">
            Project Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => updateField('projectDescription', e.target.value)}
            placeholder="Tell us about your project, goals, or any questions you have..."
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Get My Free Quote'}
        </button>
      </div>
    </form>
  );
}
