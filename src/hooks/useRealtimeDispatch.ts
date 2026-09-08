import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type BookingState = 'SEARCHING' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface BookingPayload {
  id: string;
  customerId: string;
  workerId: string | null;
  status: BookingState;
  priceEstimate: number | null;
  serviceOtp: string | null;
  latitude: number | null;
  longitude: number | null;
}

/**
 * Hook for the Customer to listen to their specific booking's state changes.
 * Monitors: ACCEPTED (worker assigned), ARRIVED, IN_PROGRESS, COMPLETED.
 */
export function useCustomerBookingRealtime(bookingId: string | null) {
  const [booking, setBooking] = useState<BookingPayload | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!bookingId) return;

    const channel = supabase
      .channel(`customer-booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Booking',
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          console.log('Customer: Realtime Booking Update Received', payload.new);
          setBooking(payload.new as BookingPayload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, supabase]);

  return booking;
}

/**
 * Hook for the Worker to listen to incoming requests (INSERT) 
 * and cancellations (UPDATE) directed to their workerId.
 */
export function useWorkerDispatchRealtime(workerId: string | null) {
  const [incomingGig, setIncomingGig] = useState<BookingPayload | null>(null);
  const [activeGig, setActiveGig] = useState<BookingPayload | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!workerId) return;

    const channel = supabase
      .channel(`worker-dispatch-${workerId}`)
      // Listen for NEW incoming dispatch requests assigned to this worker
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Booking',
          filter: `workerId=eq.${workerId}`,
        },
        (payload) => {
          console.log('Worker: New Incoming Gig Request!', payload.new);
          if (payload.new.status === 'SEARCHING') {
            setIncomingGig(payload.new as BookingPayload);
          }
        }
      )
      // Listen for updates on the currently active gig (e.g., customer cancelled, or status progressed)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Booking',
          filter: `workerId=eq.${workerId}`,
        },
        (payload) => {
          console.log('Worker: Active Gig Updated', payload.new);
          const updatedGig = payload.new as BookingPayload;
          
          if (updatedGig.status === 'CANCELLED') {
            setIncomingGig(null);
            setActiveGig(null);
          } else {
            setActiveGig(updatedGig);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workerId, supabase]);

  return {
    incomingGig,
    activeGig,
    clearIncomingGig: () => setIncomingGig(null),
  };
}
