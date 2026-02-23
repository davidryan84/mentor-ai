"""Lesson endpoints"""
from flask import request, jsonify
from backend.models.lesson import Lesson
from backend.core.database import db
from . import lessons_bp

@lessons_bp.route('', methods=['GET'])
def list_lessons():
    """Get all lessons for user"""
    subject = request.args.get('subject')
    year_level = request.args.get('year_level', type=int)
    
    query = Lesson.query.filter_by(deleted_at=None)
    if subject:
        query = query.filter_by(subject=subject)
    if year_level:
        query = query.filter_by(year_level=year_level)
    
    lessons = query.all()
    return {
        'success': True,
        'count': len(lessons),
        'lessons': [lesson.to_dict() for lesson in lessons]
    }, 200

@lessons_bp.route('/<lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
    """Get specific lesson"""
    lesson = Lesson.query.filter_by(id=lesson_id, deleted_at=None).first()
    if not lesson:
        return {'success': False, 'error': 'Lesson not found'}, 404
    
    return {
        'success': True,
        'lesson': lesson.to_dict()
    }, 200

@lessons_bp.route('', methods=['POST'])
def create_lesson():
    """Create new lesson"""
    data = request.get_json()
    
    required = ['subject', 'year_level', 'unit_number', 'le_number', 'core_concept', 'learning_intention']
    if not all(field in data for field in required):
        return {'success': False, 'error': f'Missing required fields: {required}'}, 400
    
    lesson = Lesson(
        subject=data['subject'],
        year_level=data['year_level'],
        unit_number=data['unit_number'],
        le_number=data['le_number'],
        core_concept=data['core_concept'],
        learning_intention=data['learning_intention'],
        framework=data.get('framework', 'I Do/We Do/You Do'),
        duration_minutes=data.get('duration_minutes', 60),
        teaching_notes=data.get('teaching_notes'),
        materials_needed=data.get('materials_needed')
    )
    
    db.session.add(lesson)
    db.session.commit()
    
    return {
        'success': True,
        'lesson': lesson.to_dict(),
        'message': 'Lesson created successfully'
    }, 201

@lessons_bp.route('/<lesson_id>', methods=['PUT'])
def update_lesson(lesson_id):
    """Update lesson"""
    lesson = Lesson.query.filter_by(id=lesson_id, deleted_at=None).first()
    if not lesson:
        return {'success': False, 'error': 'Lesson not found'}, 404
    
    data = request.get_json()
    
    for field in ['subject', 'year_level', 'unit_number', 'le_number', 'core_concept', 
                  'learning_intention', 'framework', 'duration_minutes', 'teaching_notes', 'materials_needed']:
        if field in data:
            setattr(lesson, field, data[field])
    
    db.session.commit()
    
    return {
        'success': True,
        'lesson': lesson.to_dict()
    }, 200

@lessons_bp.route('/<lesson_id>', methods=['DELETE'])
def delete_lesson(lesson_id):
    """Soft delete lesson"""
    lesson = Lesson.query.filter_by(id=lesson_id, deleted_at=None).first()
    if not lesson:
        return {'success': False, 'error': 'Lesson not found'}, 404
    
    from datetime import datetime
    lesson.deleted_at = datetime.utcnow()
    db.session.commit()
    
    return {
        'success': True,
        'message': 'Lesson deleted'
    }, 200
