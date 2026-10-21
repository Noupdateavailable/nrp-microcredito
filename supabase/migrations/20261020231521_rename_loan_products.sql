-- Align product values with NRP's real offering.
alter type public.loan_product rename value 'salary' to 'personal';
alter type public.loan_product rename value 'emergency' to 'entrepreneur';
