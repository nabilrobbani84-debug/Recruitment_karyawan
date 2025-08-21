import React from 'react';
import { Button } from '@/component/common/Button';
import { MessageSquare } from 'lucide-react';

export const HomeContactForm = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="relative isolate overflow-hidden bg-blue-700 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          {/* Efek gradasi background */}
          <div className="absolute -top-24 left-1/2 -z-10 h-96 w-full -translate-x-1/2 blur-3xl" aria-hidden="true">
            <div className="aspect-[1108/632] w-full bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" />
          </div>

          <MessageSquare className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Punya Pertanyaan?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/80">
            Tim kami siap membantu Anda. Kirimkan pesan Anda melalui formulir di bawah ini.
          </p>
          <form className="mx-auto mt-10 flex max-w-md flex-col gap-4">
            <input type="text" name="name" id="name" required className="h-12 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Nama Anda" />
            <input type="email" name="email-address" id="email-address" required className="h-12 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Masukkan email Anda" />
            <textarea name="message" id="message" rows={4} required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Pesan Anda"></textarea>
            <Button type="submit" variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Kirim Pesan
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};