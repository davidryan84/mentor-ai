import React, { useState } from 'react';
import axios from 'axios';

function CreateLessonPage({ user }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: '',
    year_level: 6,
    unit_number: '',
    le_number: '',
    core_concept: '',
    learning_intention: '',
    duration_minutes: 60,
    teaching_notes: '',
    materials_needed: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lessonId, setLessonId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/lessons', formData);
      if (response.data.success) {
        setSuccess(true);
        setLessonId(response.data.lesson.id);
        setTimeout(() => {
          setFormData({
            subject: '',
            year_level: 6,
            unit_number: '',
            le_number: '',
            core_concept: '',
            learning_intention: '',
            duration_minutes: 60,
            teaching_notes: '',
            materials_needed: ''
          });
          setStep(1);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
      alert('Error creating lesson: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      marginBottom: '30px'
    },
    h2: {
      color: '#2D8B3D',
      marginBottom: '10px'
    },
    successBox: {
      backgroundColor: '#d4edda',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px',
      border: '1px solid #c3e6cb',
      color: '#155724'
    },
    formSection: {
      marginBottom: '30px'
    },
    h3: {
      color: '#333',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '100px',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '30px'
    },
    buttonPrimary: {
      backgroundColor: '#2D8B3D',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s'
    },
    buttonPrimaryDisabled: {
      backgroundColor: '#2D8B3D',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '4px',
      cursor: 'not-allowed',
      border: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      opacity: 0.6
    },
    buttonSecondary: {
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '14px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.h2}>Create New Lesson</h2>
        <p style={{ color: '#666' }}>Step {step} of 3</p>
      </div>

      {success && (
        <div style={styles.successBox}>
          ✅ Lesson created successfully! ID: {lessonId}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div style={styles.formSection}>
            <h3 style={styles.h3}>Step 1: Basic Information</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject *</label>
              <select 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
                style={styles.select}
              >
                <option value="">-- Select Subject --</option>
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Year Level *</label>
              <input 
                type="number" 
                name="year_level" 
                value={formData.year_level} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Unit Number *</label>
              <input 
                type="number" 
                name="unit_number" 
                value={formData.unit_number} 
                onChange={handleChange} 
                placeholder="e.g., 22" 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Learning Experience Number *</label>
              <input 
                type="number" 
                name="le_number" 
                value={formData.le_number} 
                onChange={handleChange} 
                placeholder="e.g., 1" 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                style={styles.buttonPrimary}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Core Content */}
        {step === 2 && (
          <div style={styles.formSection}>
            <h3 style={styles.h3}>Step 2: Core Content</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Core Concept *</label>
              <input 
                type="text" 
                name="core_concept" 
                value={formData.core_concept} 
                onChange={handleChange} 
                placeholder="e.g., Comparing Fractions" 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Learning Intention *</label>
              <textarea 
                name="learning_intention" 
                value={formData.learning_intention} 
                onChange={handleChange} 
                placeholder="What will students learn?" 
                required 
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Lesson Framework</label>
              <select 
                name="framework" 
                value={formData.framework} 
                onChange={handleChange} 
                style={styles.select}
              >
                <option value="I Do/We Do/You Do">I Do / We Do / You Do</option>
                <option value="5E">5E (Engage, Explore, Explain, Elaborate, Evaluate)</option>
                <option value="PBL">Problem-Based Learning</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Duration (minutes)</label>
              <input 
                type="number" 
                name="duration_minutes" 
                value={formData.duration_minutes} 
                onChange={handleChange} 
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                style={styles.buttonSecondary}
              >
                ← Back
              </button>
              <button 
                type="button" 
                onClick={() => setStep(3)} 
                style={styles.buttonPrimary}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {step === 3 && (
          <div style={styles.formSection}>
            <h3 style={styles.h3}>Step 3: Additional Information (Optional)</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Teaching Notes</label>
              <textarea 
                name="teaching_notes" 
                value={formData.teaching_notes} 
                onChange={handleChange} 
                placeholder="Any additional teaching notes..." 
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Materials Needed</label>
              <textarea 
                name="materials_needed" 
                value={formData.materials_needed} 
                onChange={handleChange} 
                placeholder="List of materials (fraction strips, pizza circles, etc.)" 
                style={styles.textarea}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                style={styles.buttonSecondary}
              >
                ← Back
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                style={loading ? styles.buttonPrimaryDisabled : styles.buttonPrimary}
              >
                {loading ? 'Creating...' : 'Create Lesson →'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateLessonPage;
