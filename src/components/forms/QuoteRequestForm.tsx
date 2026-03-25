'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  // Step 1: Property Info
  zipCode: string;
  state: string;
  propertyType: string;
  monthlyBill: string;
  // Step 2: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 3: Project Details
  roofType: string;
  shadeLevel: string;
  timeline: string;
  // Meta
  sourcePage: string;
}

const STATES = ['California', 'Hawaii', 'Idaho', 'Texas'];
const PROPERTY_TYPES = ['Residential', 'Commercial', 'Nonprofit'];
const MONTHLY_BILLS = ['$0-50', '$50-100', '$100-150', '$150-200', '$200-300', '$300+'];
const ROOF_TYPES = ['Asphalt Shingle', 'Tile', 'Metal', 'Flat', 'Other'];
const SHADE_LEVELS = ['No Shade', 'Partial Shade', 'Full Shade'];
const TIMELINES = ['ASAP', '1-3 months', '3-6 months', '6-12 months', 'Just Researching'];

const STEPS = [
  { label: 'Property Info', number: 1 },
  { label: 'Contact Info', number: 2 },
  { label: 'Project Details', number: 3 },
];

export function QuoteRequestForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    state: '',
    propertyType: '',
    monthlyBill: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roofType: '',
    shadeLevel: '',
    timeline: '',
    sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function validateStep(): boolean {
    if (step === 1) {
      if (!formData.zipCode.trim()) {
        setError('Please enter your zip code.');
        return false;
      }
      if (!/^\d{5}$/.test(formData.zipCode.trim())) {
        setError('Please enter a valid 5-digit zip code.');
        return false;
      }
      if (!formData.state) {
        setError('Please select your state.');
        return false;
      }
      if (!formData.propertyType) {
        setError('Please select a property type.');
        return false;
      }
      if (!formData.monthlyBill) {
        setError('Please select your monthly electric bill range.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.firstName.trim()) {
        setError('Please enter your first name.');
        return false;
      }
      if (!formData.lastName.trim()) {
        setError('Please enter your last name.');
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
      if (!formData.phone.trim()) {
        setError('Please enter your phone number.');
        return false;
      }
      if (!/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
        setError('Please enter a valid 10-digit phone number.');
        return false;
      }
    }

    return true;
  }

  function handleNext() {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function handleBack() {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;

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

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {STEPS.map((s) => (
          <div key={s.number} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step >= s.number
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s.number}
            </div>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                step >= s.number ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
            {s.number < 3 && (
              <div
                className={`mx-2 hidden h-0.5 w-8 sm:block ${
                  step > s.number ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Property Info */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Property Information</h2>

          <div>
            <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-700">
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              id="zipCode"
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={formData.zipCode}
              onChange={(e) => updateField('zipCode', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your zip code"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            >
              <option value="">Select your state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-gray-700">
              Property Type <span className="text-red-500">*</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {PROPERTY_TYPES.map((type) => (
                <label
                  key={type}
                  className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
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

          <div>
            <label htmlFor="monthlyBill" className="mb-1 block text-sm font-medium text-gray-700">
              Monthly Electric Bill <span className="text-red-500">*</span>
            </label>
            <select
              id="monthlyBill"
              value={formData.monthlyBill}
              onChange={(e) => updateField('monthlyBill', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            >
              <option value="">Select your monthly bill</option>
              {MONTHLY_BILLS.map((bill) => (
                <option key={bill} value={bill}>{bill}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Contact Info */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>

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
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>

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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Step 3: Project Details */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>

          <div>
            <label htmlFor="roofType" className="mb-1 block text-sm font-medium text-gray-700">
              Roof Type
            </label>
            <select
              id="roofType"
              value={formData.roofType}
              onChange={(e) => updateField('roofType', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            >
              <option value="">Select your roof type</option>
              {ROOF_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-gray-700">Shade Level</legend>
            <div className="flex flex-wrap gap-3">
              {SHADE_LEVELS.map((level) => (
                <label
                  key={level}
                  className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    formData.shadeLevel === level
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="shadeLevel"
                    value={level}
                    checked={formData.shadeLevel === level}
                    onChange={(e) => updateField('shadeLevel', e.target.value)}
                    className="sr-only"
                  />
                  {level}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-gray-700">
              Timeline
            </label>
            <select
              id="timeline"
              value={formData.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            >
              <option value="">When are you looking to go solar?</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-amber-500 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Get My Free Quote'}
          </button>
        )}
      </div>
    </form>
  );
}
