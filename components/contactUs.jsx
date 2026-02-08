'use client'
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      ('Contact Form Data:', values);
      message.success('Message sent successfully!');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 md:py-16 px-4">
      {/* Top Section */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-block">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Let's Connect
          </h1>
          <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4 text-base md:text-lg">We'd love to hear from you</p>
      </div>

      {/* Contact Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 backdrop-blur-sm border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-2"
          >
            <Form.Item
              name="name"
              label={<span className="text-gray-700 font-semibold text-sm md:text-base">Full Name</span>}
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} className="md:w-5 md:h-5" />
                </div>
                <Input 
                  placeholder="John Doe" 
                  className="pl-10 md:pl-12 h-11 md:h-12 rounded-lg md:rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-semibold text-sm md:text-base">Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} className="md:w-5 md:h-5" />
                </div>
                <Input 
                  placeholder="john@example.com" 
                  className="pl-10 md:pl-12 h-11 md:h-12 rounded-lg md:rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="message"
              label={<span className="text-gray-700 font-semibold text-sm md:text-base">Your Message</span>}
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-4 text-gray-400">
                  <MessageSquare size={18} className="md:w-5 md:h-5" />
                </div>
                <TextArea 
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="pl-10 md:pl-12 pt-3 rounded-lg md:rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors resize-none text-sm md:text-base"
                />
              </div>
            </Form.Item>

            <Form.Item className="mb-0 pt-2 md:pt-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                loading={loading}
                className="h-12 md:h-14 text-sm md:text-base font-semibold rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 border-none shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {!loading && <Send size={18} className="md:w-5 md:h-5" />}
                Send Message
              </Button>
            </Form.Item>
          </Form>

          {/* Bottom Info */}
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-xs md:text-sm">
              We typically respond within 24 hours
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4">
              <a href="mailto:support@yourblog.com" className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm transition-colors">
                support@yourblog.com
              </a>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm transition-colors">
                +91 1234567890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;