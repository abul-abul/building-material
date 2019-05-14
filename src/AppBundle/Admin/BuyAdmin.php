<?php


namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class BuyAdmin extends Admin
{

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('firstname', null, array(
                'label' => 'Имя',
            ))
            ->add('lastname', null, array(
                'label' => 'Фамилия',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
           // ->add('product')
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('firstname', null, array(
                'label' => 'Имя',
            ))
            ->add('lastname', null, array(
                'label' => 'Фамилия',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('product')

        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('firstname', null, array(
                'label' => 'Имя',
            ))
            ->add('lastname', null, array(
                'label' => 'Фамилия',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('product')
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('firstname', null, array(
                'label' => 'Имя',
            ))
            ->add('lastname', null, array(
                'label' => 'Фамилия',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('product')
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }
}