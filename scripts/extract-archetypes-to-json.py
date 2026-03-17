#!/usr/bin/env python3
"""
TypeScript archetypes 파일을 읽어서 JSON으로 변환하는 스크립트
"""
import json
import re

def extract_string_value(content, start_pos):
    """백틱으로 감싼 문자열 추출"""
    if content[start_pos] != '`':
        return None
    
    end_pos = start_pos + 1
    while end_pos < len(content):
        if content[end_pos] == '`' and content[end_pos-1] != '\\':
            return content[start_pos+1:end_pos]
        end_pos += 1
    return None

def extract_array_value(content, start_pos):
    """배열 추출"""
    if content[start_pos] != '[':
        return None
    
    bracket_count = 1
    end_pos = start_pos + 1
    while end_pos < len(content) and bracket_count > 0:
        if content[end_pos] == '[':
            bracket_count += 1
        elif content[end_pos] == ']':
            bracket_count -= 1
        end_pos += 1
    
    array_str = content[start_pos:end_pos]
    # 간단한 배열 파싱
    items = []
    in_string = False
    current_item = ""
    i = 1
    while i < len(array_str) - 1:
        char = array_str[i]
        if char == "'" and array_str[i-1] != '\\':
            in_string = not in_string
            if not in_string and current_item:
                items.append(current_item)
                current_item = ""
        elif in_string:
            current_item += char
        i += 1
    
    return items

def parse_archetypes_file(file_path):
    """TypeScript 파일 파싱"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    archetypes = []
    
    # 각 유형 추출
    pattern = r"'([A-Z_]+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}"
    
    # ARCHETYPES 객체 찾기
    start = content.find('export const ARCHETYPES')
    if start == -1:
        return []
    
    # 각 archetype 블록 찾기
    archetype_pattern = r"'([A-Z_]+)':\s*\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*alias:\s*'([^']+)',\s*subtitle:\s*'([^']+)',\s*oneliner:\s*'([^']+)',\s*description:\s*'([^']+)',"
    
    current_pos = start
    
    while True:
        # 다음 archetype 찾기
        match = re.search(r"'([A-Z_]+)':\s*\{", content[current_pos:])
        if not match:
            break
        
        key = match.group(1)
        archetype_start = current_pos + match.start()
        
        # 이 archetype의 끝 찾기 (다음 archetype 또는 파일 끝)
        next_match = re.search(r"\n  \},\n  '[A-Z_]+", content[archetype_start:])
        if next_match:
            archetype_end = archetype_start + next_match.start() + 4
        else:
            # 마지막 archetype
            archetype_end = content.find('\n};', archetype_start)
        
        archetype_block = content[archetype_start:archetype_end]
        
        # 각 필드 추출
        archetype = {"key": key}
        
        # id
        id_match = re.search(r"id:\s*'([^']+)'", archetype_block)
        if id_match:
            archetype['id'] = id_match.group(1)
        
        # name
        name_match = re.search(r"name:\s*'([^']+)'", archetype_block)
        if name_match:
            archetype['name'] = name_match.group(1)
        
        # alias
        alias_match = re.search(r"alias:\s*'([^']+)'", archetype_block)
        if alias_match:
            archetype['alias'] = alias_match.group(1)
        
        # subtitle
        subtitle_match = re.search(r"subtitle:\s*'([^']+)'", archetype_block)
        if subtitle_match:
            archetype['subtitle'] = subtitle_match.group(1)
        
        # oneliner
        oneliner_match = re.search(r"oneliner:\s*'([^']+)'", archetype_block)
        if oneliner_match:
            archetype['oneliner'] = oneliner_match.group(1)
        
        # description
        description_match = re.search(r"description:\s*'([^']+)'", archetype_block)
        if description_match:
            archetype['description'] = description_match.group(1)
        
        # light (백틱 문자열)
        light_match = re.search(r"light:\s*`([^`]+)`", archetype_block, re.DOTALL)
        if light_match:
            archetype['light'] = light_match.group(1).strip()
        
        # shadow (백틱 문자열)
        shadow_match = re.search(r"shadow:\s*`([^`]+)`", archetype_block, re.DOTALL)
        if shadow_match:
            archetype['shadow'] = shadow_match.group(1).strip()
        
        # action (백틱 문자열)
        action_match = re.search(r"action:\s*`([^`]+)`", archetype_block, re.DOTALL)
        if action_match:
            archetype['action'] = action_match.group(1).strip()
        
        # reflectionQuestions (배열)
        questions_match = re.search(r"reflectionQuestions:\s*\[(.*?)\]", archetype_block, re.DOTALL)
        if questions_match:
            questions_str = questions_match.group(1)
            questions = re.findall(r"'([^']+)'", questions_str)
            archetype['reflectionQuestions'] = questions
        
        # rootDominance
        root_match = re.search(r"rootDominance:\s*'([^']+)'", archetype_block)
        if root_match:
            archetype['rootDominance'] = root_match.group(1)
        
        # majorMuscle
        major_match = re.search(r"majorMuscle:\s*'([^']+)'", archetype_block)
        if major_match:
            archetype['majorMuscle'] = major_match.group(1)
        
        # minorMuscle
        minor_match = re.search(r"minorMuscle:\s*'([^']+)'", archetype_block)
        if minor_match:
            archetype['minorMuscle'] = minor_match.group(1)
        
        archetypes.append(archetype)
        
        current_pos = archetype_end
    
    return archetypes

def main():
    archetypes = parse_archetypes_file('constants/archetypes.ts')
    
    # 기존 JSON 파일 읽기
    with open('CONTENT_DATABASE.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # archetypes 업데이트
    data['archetypes'] = archetypes
    data['metadata']['totalArchetypes'] = len(archetypes)
    
    # JSON 파일 저장
    with open('CONTENT_DATABASE.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {len(archetypes)}개 유형을 JSON으로 변환했습니다!")
    print(f"📄 파일: CONTENT_DATABASE.json")

if __name__ == '__main__':
    main()
