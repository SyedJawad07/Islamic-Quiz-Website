
import React from 'react';
import { Award, Download, Share2, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  onDownload?: () => void;
  onShare?: () => void;
}

const Certificate = ({
  studentName,
  courseName,
  completionDate,
  instructorName,
  onDownload,
  onShare
}: CertificateProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Certificate Preview */}
      <div className="relative border-8 border-gold/30 bg-ivory p-8 md:p-12 shadow-xl rounded-lg mb-6">
        <div className="absolute inset-0 islamic-pattern opacity-5"></div>
        
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Award className="h-16 w-16 text-gold" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald mb-2">Certificate of Completion</h2>
          <div className="w-32 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Certificate Body */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">This is to certify that</p>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">{studentName}</h3>
          <p className="text-gray-600 mb-4">has successfully completed the course</p>
          <h4 className="text-lg md:text-xl font-bold mb-4 text-emerald">{courseName}</h4>
          <p className="text-gray-600 mb-2">on</p>
          <p className="text-gray-800 font-medium mb-6">{completionDate}</p>
        </div>
        
        {/* Certificate Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center">
            <div className="w-32 h-px bg-gray-400 mb-2 mx-auto"></div>
            <p className="text-gray-600">Imami Mudrasa</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-px bg-gray-400 mb-2 mx-auto"></div>
            <p className="text-gray-600">{instructorName}</p>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
        </div>
        
        {/* Certificate ID */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">Certificate ID: IMC-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
        </div>
      </div>
      
      {/* Certificate Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <button 
          onClick={onDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald hover:bg-emerald-dark text-white rounded-md transition-colors"
        >
          <Download size={18} />
          <span>Download Certificate</span>
        </button>
        <button 
          onClick={onShare}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold/80 text-white rounded-md transition-colors"
        >
          <Share2 size={18} />
          <span>Share Certificate</span>
        </button>
      </div>
    </div>
  );
};

export default Certificate;
