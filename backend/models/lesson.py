"""Lesson model"""
from backend.core.database import BaseModel, db
from datetime import datetime

class Lesson(BaseModel):
    """Lesson model for learning experiences"""
    __tablename__ = 'lessons'
    
    # Basic info
    subject = db.Column(db.String(50), nullable=False)
    year_level = db.Column(db.Integer, nullable=False)
    unit_number = db.Column(db.Integer, nullable=False)
    le_number = db.Column(db.Integer, nullable=False)
    
    # Core content
    core_concept = db.Column(db.String(255), nullable=False)
    learning_intention = db.Column(db.Text, nullable=False)
    framework = db.Column(db.String(50), default='I Do/We Do/You Do')
    
    # Planning
    duration_minutes = db.Column(db.Integer, default=60)
    teaching_notes = db.Column(db.Text)
    materials_needed = db.Column(db.Text)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime)
    last_taught_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<Lesson {self.subject} Unit {self.unit_number} LE {self.le_number}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'year_level': self.year_level,
            'unit_number': self.unit_number,
            'le_number': self.le_number,
            'core_concept': self.core_concept,
            'learning_intention': self.learning_intention,
            'framework': self.framework,
            'duration_minutes': self.duration_minutes,
            'teaching_notes': self.teaching_notes,
            'materials_needed': self.materials_needed,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_taught_at': self.last_taught_at.isoformat() if self.last_taught_at else None,
        }
