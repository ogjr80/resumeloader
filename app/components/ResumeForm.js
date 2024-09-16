import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ResumeForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (section) {
        const updatedSection = [...prev[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        return { ...prev, [section]: updatedSection };
      }
      return { ...prev, bioData: { ...prev.bioData, [name]: value } };
    });
  };

  const handleAddEntry = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const handleRemoveEntry = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bio Data</h3>
        <Input type="text" name="name" value={formData.bioData.name} onChange={(e) => handleChange(e)} placeholder="Name" />
        <Input type="email" name="email" value={formData.bioData.email} onChange={(e) => handleChange(e)} placeholder="Email" />
        <Input type="tel" name="phone" value={formData.bioData.phone} onChange={(e) => handleChange(e)} placeholder="Phone" />
        <Input type="text" name="address" value={formData.bioData.address} onChange={(e) => handleChange(e)} placeholder="Address" />
        <Textarea name="summary" value={formData.bioData.summary} onChange={(e) => handleChange(e)} placeholder="Summary" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Education</h3>
        {formData.educationData.map((edu, index) => (
          <div key={index} className="space-y-2 border p-4 rounded">
            <Input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(e, 'educationData', index)} placeholder="Degree" />
            <Input type="text" name="institution" value={edu.institution} onChange={(e) => handleChange(e, 'educationData', index)} placeholder="Institution" />
            <Input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleChange(e, 'educationData', index)} placeholder="Graduation Year" />
            <Button type="button" onClick={() => handleRemoveEntry('educationData', index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddEntry('educationData')}>Add Education</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        {formData.experienceData.map((exp, index) => (
          <div key={index} className="space-y-2 border p-4 rounded">
            <Input type="text" name="title" value={exp.title} onChange={(e) => handleChange(e, 'experienceData', index)} placeholder="Title" />
            <Input type="text" name="company" value={exp.company} onChange={(e) => handleChange(e, 'experienceData', index)} placeholder="Company" />
            <Input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, 'experienceData', index)} placeholder="Start Date" />
            <Input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, 'experienceData', index)} placeholder="End Date" />
            <Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, 'experienceData', index)} placeholder="Responsibilities" />
            <Button type="button" onClick={() => handleRemoveEntry('experienceData', index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => handleAddEntry('experienceData')}>Add Experience</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <Textarea 
          name="skills" 
          value={formData.skillsData.join(', ')} 
          onChange={(e) => setFormData(prev => ({ ...prev, skillsData: e.target.value.split(',').map(skill => skill.trim()) }))} 
          placeholder="Enter skills separated by commas" 
        />
      </div>

      <Button type="submit">Save Resume Data</Button>
    </form>
  );
};

export default ResumeForm;
