import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import styles from '../styles/Form.module.css';

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (images.length) {
      const previewUrls = images.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);

      // Cleanup object URLs on unmount or when images change
      return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 10) {
      setErrorMsg('❌ Maximum 10 images allowed');
      return;
    }

    // Prevent duplicate files by name and size
    const newFiles = files.filter(
      (file) =>
        !images.some((img) => img.name === file.name && img.size === file.size)
    );

    if (newFiles.length < files.length) {
      setErrorMsg('❌ Some duplicate images were ignored');
    } else {
      setErrorMsg('');
    }

    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setErrorMsg('');
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setErrorMsg('❌ At least one image is required');
      return;
    }

    try {
      setErrorMsg('');
      setSuccessMsg('');

      const formData = new FormData();
      images.forEach((file) => formData.append('images', file));

      const uploadRes = await fetch('/api/schools/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || 'Image upload failed');
      }

      const schoolData = {
        ...data,
        images: uploadData.urls,
      };

      const res = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolData),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error || 'Failed to add school');
      }

      setSuccessMsg('✅ School added successfully!');
      reset();
      setImages([]);

      // Reload page after 2 seconds
      setTimeout(() => {
        setSuccessMsg('');
        window.location.reload();
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
      setSuccessMsg('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏫 Add New School</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* School Name */}
        <label className={styles.label}>School Name</label>
        <input
          className={styles.field}
          {...register('name', { required: 'School name is required' })}
          placeholder="e.g., Sunrise Public School"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        {/* Address */}
        <label className={styles.label}>Address</label>
        <textarea
          className={`${styles.field} ${styles.textarea}`}
          {...register('address', { required: 'Address is required' })}
          placeholder="e.g., 123 Main Street"
        />
        {errors.address && <p className={styles.error}>{errors.address.message}</p>}

        {/* City */}
        <label className={styles.label}>City</label>
        <input
          className={styles.field}
          {...register('city', { required: 'City is required' })}
          placeholder="e.g., Mumbai"
        />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}

        {/* State */}
        <label className={styles.label}>State</label>
        <input
          className={styles.field}
          {...register('state', { required: 'State is required' })}
          placeholder="e.g., Maharashtra"
        />
        {errors.state && <p className={styles.error}>{errors.state.message}</p>}

        {/* Contact */}
        <label className={styles.label}>Contact</label>
        <input
          className={styles.field}
          type="tel"
          {...register('contact', {
            required: 'Contact is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit number',
            },
          })}
          placeholder="e.g., 9876543210"
        />
        {errors.contact && <p className={styles.error}>{errors.contact.message}</p>}

        {/* Email */}
        <label className={styles.label}>Email</label>
        <input
          className={styles.field}
          type="email"
          {...register('email_id', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          placeholder="e.g., school@example.com"
        />
        {errors.email_id && <p className={styles.error}>{errors.email_id.message}</p>}

        {/* Images */}
        <label className={styles.label}>Upload Images (Max 10)</label>
        <input
          className={styles.field}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Image Previews */}
        <div className={styles.previewContainer}>
          {previews.map((src, idx) => (
            <div key={idx} className={styles.previewBox}>
              <img
                src={src}
                alt={`Preview ${idx + 1}`}
                className={styles.previewImage}
                loading="lazy"
              />
              <button
                type="button"
                aria-label={`Remove image ${idx + 1}`}
                onClick={() => removeImage(idx)}
                className={styles.removeBtn}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Messages */}
        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
        {successMsg && <p className={styles.successMessage}>{successMsg}</p>}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : '🚀 Submit'}
        </button>
      </form>
    </div>
  );
}
