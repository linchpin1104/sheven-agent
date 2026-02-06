'use client';

import { Archetype } from '@/types';
import { motion } from 'framer-motion';

interface ResultHeaderProps {
  archetype: Archetype;
  level: 'LIGHT' | 'SHADOW';
}

export function ResultHeader({ archetype, level }: ResultHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 mb-8"
    >
      <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
        {level === 'LIGHT' ? '✨ LIGHT MODE' : '🌑 SHADOW MODE'}
      </div>
      
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {archetype.alias}
      </h1>
      
      <h2 className="text-2xl text-gray-700 font-semibold">
        {archetype.name}
      </h2>
      
      <p className="text-lg text-gray-600 italic">
        &ldquo;{archetype.subtitle}&rdquo;
      </p>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          {archetype.oneliner}
        </p>
      </div>
    </motion.div>
  );
}
